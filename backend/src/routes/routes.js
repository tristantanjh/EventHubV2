import express from "express";
import {
  createUser,
  getEmail,
  getUserWithId,
  getProfilePic,
  editProfile,
  editPassword,
  getUserWithEmail,
} from "../controllers/userController.js";
import { createEvent, getEventWithId } from "../controllers/eventController.js";

const APIrouter = express.Router();

//////////////////////////////////////////////////  user methods ///////////////////////////////////////////////////

APIrouter.post("/createUser", createUser);

APIrouter.get("/getEmail", getEmail);

APIrouter.get("/getUserWithId", getUserWithId);

APIrouter.get("/getProfilePic", getProfilePic);

APIrouter.put("/editProfile", editProfile);

APIrouter.put("/editPassword", editPassword);

APIrouter.get("/getUserWithEmail", getUserWithEmail);

//////////////////////////////////////////////////  event methods ///////////////////////////////////////////////////

APIrouter.post("/createEvent", createEvent);

APIrouter.get("/getEventWithId", getEventWithId);

export { APIrouter };
