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

export { createEvent, getEventWithId };
