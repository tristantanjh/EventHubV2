import express from "express";
import {
  createUser,
  getEmail,
  getUserWithId,
  getProfilePic,
  editProfile,
  editProfilePic,
  editPassword,
  getUserWithEmail,
} from "../controllers/userController.js";
import {
  createEvent,
  getAllEvents, 
  getEventWithId,
  registerForEvent,
  unregisterForEvent,
  markUserAsAttended,
  markUserAsUnattended,
  deleteEvent,
} from "../controllers/eventController.js";

const APIrouter = express.Router();

//////////////////////////////////////////////////  user methods ///////////////////////////////////////////////////

APIrouter.post("/createUser", createUser);

APIrouter.get("/getEmail", getEmail);

APIrouter.get("/getUserWithId", getUserWithId);

APIrouter.get("/getProfilePic", getProfilePic);

APIrouter.put("/editProfile", editProfile);

APIrouter.put("/editProfilePic", editProfilePic);

APIrouter.put("/editPassword", editPassword);

APIrouter.get("/getUserWithEmail", getUserWithEmail);

//////////////////////////////////////////////////  event methods ///////////////////////////////////////////////////

APIrouter.post("/createEvent", createEvent);

APIrouter.get("/getAllEvents", getAllEvents);

APIrouter.get("/getEventWithId", getEventWithId);

APIrouter.put("/registerForEvent", registerForEvent);

APIrouter.put("/unregisterForEvent", unregisterForEvent);

APIrouter.put("/markUserAsAttended", markUserAsAttended);

APIrouter.put("/markUserAsUnattended", markUserAsUnattended);

APIrouter.delete("/deleteEvent", deleteEvent);

export { APIrouter };
