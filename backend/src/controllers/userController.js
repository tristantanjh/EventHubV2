import { User } from "../model/User.js";
import express from "express";
const router = express.Router();

const createUser = async (req, res) => {
  // password hashed on FE
  const { username, phoneNumber, email, password, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    const newUser = new User({
      username,
      phoneNumber,
      email,
      password,
      profilePic,
    });

    newUser
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ message: "User created successfully", user: result });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "An error occurred during login." });
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

const getUserWithId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserWithEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  const { userId } = req.params;
  const { email, username, profilePic } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.email = email;
    user.username = username;
    user.profilePic = profilePic;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user profile." });
  }
};

const editPassword = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  const { initialPassword, newPassword } = req.body;

  user.changePassword(initialPassword, newPassword, (error) => {
    if (error) {
      if (error.name === "IncorrectPasswordError") {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        console.error(error);
        res.status(500).json({
          message: "Could not change password. Please try again later.",
        });
      }
    } else {
      res.json({ message: "Password successfully changed!" });
    }
  });
};

const getEmail = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username: username });

    if (user) {
      res.status(200).json({ email: user.email });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfilePic = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username: username });

    if (user && user.profilePic) {
      res.status(200).json({ profilePic: user.profilePic });
    } else if (user && !user.profilePic) {
      res.status(404).json({ message: "Profile picture not set." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createUser,
  getEmail,
  getUserWithId,
  getProfilePic,
  editProfile,
  editPassword,
  getUserWithEmail,
};
