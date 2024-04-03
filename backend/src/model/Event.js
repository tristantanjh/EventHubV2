import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  deadline: {
    required: true,
    type: Date,
  },
  eventPic: {
    required: true,
    type: String,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  registrants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema); // Create Event model

export { Event };
