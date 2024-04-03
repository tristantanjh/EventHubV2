import { Event } from "../model/Event.js";
import { User } from "../model/User.js";
import express from "express";
const router = express.Router();

const createEvent = async (req, res) => {
  const { title, location, description, date, deadline, eventPic, host } =
    req.body;

  try {
    const newEvent = new Event({
      title,
      location,
      description,
      date,
      deadline,
      eventPic,
      host,
    });

    const savedEvent = await newEvent.save();

    await User.findOneAndUpdate(
      { _id: host },
      { $push: { hostedEvents: savedEvent._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Event created successfully", event: savedEvent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the event." });
  }
};

const getEventWithId = async (req, res) => {
  try {
    const eventId = req.query.eventId;
    const event = await Event.findOne({ _id: eventId });

    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: "Event not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the event." });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    // Find the event by ID and update its registered users array
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { registrants: userId } },
      { new: true }
    );

    // Find the user by ID and update their registeredEvents array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { registeredEvents: eventId } },
      { new: true }
    );

    res.status(200).json({ updatedEvent, updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while registering for the event." });
  }
};

const unregisterForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Find the event by ID and update its registrants array
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { registrants: userId } },
      { new: true }
    );

    // Find the user by ID and update their registeredEvents array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { registeredEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      message: "User unregistered from the event.",
      updatedEvent: event,
      updatedUser: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while unregistering from the event.",
    });
  }
};

const markUserAsAttended = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);

    // Check if the user is in the event's registrants array
    if (!event.registrants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is not registered for this event." });
    }

    // Remove the user from the event's registrants array and add to attendees array
    event.attendees.push(userId);
    event.registrants.pull(userId);
    const updatedEvent = await event.save();

    // Find the user by ID
    const user = await User.findById(userId);

    // Remove the event from the user's registeredEvents array and add to attendedEvents array
    user.attendedEvents.push(eventId);
    user.registeredEvents.pull(eventId);
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User marked as attended for the event.",
      updatedEvent,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while marking user as attended." });
  }
};

const markUserAsUnattended = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);

    // Check if the user is in the event's attendees array
    if (!event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is not marked as attended for this event." });
    }

    // Remove the user from the event's attendees array and add back to registeredUsers array
    event.registrants.push(userId);
    event.attendees.pull(userId);
    const updatedEvent = await event.save();

    // Find the user by ID
    const user = await User.findById(userId);

    // Remove the event from the user's attendedEvents array and add back to registeredEvents array
    user.registeredEvents.push(eventId);
    user.attendedEvents.pull(eventId);
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User marked as unattended for the event.",
      updatedEvent,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while marking user as unattended." });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.query.eventId; // Assuming the event ID is passed in the query parameter

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // If event is not found, return a 404 status
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Find the user who hosted the event and remove the event from their hostedEvents array
    const user = await User.findOne({ hostedEvents: eventId });
    if (user) {
      user.hostedEvents.pull(eventId);
      await user.save();
    }

    // Find all users who registered for the event and remove the event from their registeredEvents and attendedEvents array
    await User.updateMany(
      { $or: [{ registeredEvents: eventId }, { attendedEvents: eventId }] },
      { $pull: { registeredEvents: eventId, attendedEvents: eventId } }
    );

    res
      .status(200)
      .json({ message: "Event deleted successfully.", deletedEvent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the event." });
  }
};

export {
  createEvent,
  getEventWithId,
  registerForEvent,
  unregisterForEvent,
  markUserAsAttended,
  markUserAsUnattended,
  deleteEvent,
};
