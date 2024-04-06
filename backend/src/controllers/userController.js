import { User } from "../model/User.js";
import express from "express";
const router = express.Router();

const createUser = async (req, res) => {
  // password hashed on FE
  const { username, phoneNumber, email, password, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser && existingEmail) {
      return res
        .status(400)
        .json({ error: "Username and Email is already taken." });
    }

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

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
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming the user ID is passed in the URL parameter
    const { username, email, phoneNumber, bio } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({ error: "Username is already taken." });
    }
    
    if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    // Update user's profile fields
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.bio = bio;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the profile." });
  }
};

const editProfilePic = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { profilePic } = req.body;

    const user = await User.findById(userId);

    if (profilePic) {
      user.profilePic = profilePic;
    }

    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Profile Picture updated successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the profile picture.",
      });
  }
};

const editPassword = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Password updated successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the password." });
  }
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
  editProfilePic,
  editPassword,
  getUserWithEmail,
};
