import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  alpha,
} from "@mui/material";
import theme from "../../themes/theme";
import CreateIcon from "@mui/icons-material/Create";
import { useAuth } from "../../hooks/AuthProvider";
import CustomButtonWhiteSquare from "../CustomButtonWhiteSquare";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

export default function InfoCard() {
  const { user, updateUser } = useAuth();
  const { _id, username, profilePic, email, password, phoneNumber, bio } = user;
  const [userBio, setUserBio] = useState(bio);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [imageURL, setImageURL] = useState(profilePic);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    phoneNumber: "",
  });

  const [passwordError, setPasswordError] = useState({});

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    swal("Success", "Media uploaded", "success");
    console.log(result.info.secure_url);
    const secureUrl = result?.info?.secure_url;

    if (secureUrl) {
      axios
        .put(
          "http://localhost:3000/api/editProfilePic",
          { profilePic: secureUrl },
          {
            params: {
              userId: _id,
            },
          }
        )
        .then((response) => {
          console.log("Profile picture updated successfully:", response.data);
          updateUser(response.data.updatedUser);
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
      setImageURL(secureUrl);
      console.log(imageURL);
    }
  }

  const handleClose = () => {
    setNewPassword(""); // Clear the input fields
    setVerifyPassword("");
    setOpenModal(false);
  };

  const handleBioChange = (e) => {
    setUserBio(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePhoneNumChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const validateRegular = (data) => {
    const newErrors = { email: "", username: "", phoneNumber: "" };
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email || !emailRegex.test(data.email.trim())) {
      newErrors.email = !data.email
        ? "Email is required"
        : "Invalid email format";
      valid = false;
    }

    if (data.username === "") {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (data.phoneNumber === "") {
      newErrors.phoneNumber = "Phone number is required.";
      valid = false;
    }

    return { valid, newErrors };
  };

  const handleSaveProfile = async () => {
    const { valid, newErrors } = validateRegular({
      email: newEmail,
      username: newUsername,
      phoneNumber: newPhoneNumber,
    });

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    axios
      .put(
        "http://localhost:3000/api/editProfile",
        {
          username: newUsername,
          email: newEmail,
          phoneNumber: newPhoneNumber,
          bio: userBio,
        },
        {
          params: {
            userId: _id,
          },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        updateUser(response.data.updatedUser);
        toast("Profile updated successfully!", { type: "success" });
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
        const tempErrors = { email: "", username: "" };
        if (error.response.data.error === "Username is already taken.") {
          tempErrors.username = error.response.data.error;
        } else if (error.response.data.error === "Email is already taken.") {
          tempErrors.email = error.response.data.error;
        }
        setErrors(tempErrors);
      });
  };

  const validatePassword = (data) => {
    const newErrors = { password: "" };
    let valid = true;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!data.newPassword || !passwordRegex.test(data.newPassword)) {
      newErrors.password =
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    if (data.newPassword === "") {
      newErrors.password = "Password is required.";
      valid = false;
    }

    if (data.verifyPassword === "") {
      newErrors.password = "Password is required.";
      valid = false;
    }

    if (data.newPassword !== data.verifyPassword) {
      newErrors.password = "Passwords do not match.";
      valid = false;
    }

    return { valid, newErrors };
  };

  const handleSavePassword = async () => {
    const { valid, newErrors } = validatePassword({
      newPassword: newPassword,
      verifyPassword: verifyPassword,
    });

    if (!valid) {
      setPasswordError(newErrors.password);
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    axios
      .put(
        "http://localhost:3000/api/editPassword",
        {
          password: hashedPassword,
        },
        {
          params: {
            userId: _id,
          },
        }
      )
      .then((response) => {
        console.log("Password updated successfully:", response.data);
        toast("Password updated successfully!", { type: "success" });
        updateUser(response.data.updatedUser);
        setNewPassword(""); // Clear the input fields
        setVerifyPassword("");
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        setPasswordError("Error updating password.");
      });

    setOpenModal(false);
  };

  useEffect(() => {
    const notify = () => {
      if (errors.username) {
        toast(errors.username, { type: "error" });
      }
      if (errors.email) {
        toast(errors.email, { type: "error" });
      }
      if (errors.phoneNumber) {
        toast(errors.phoneNumber, { type: "error" });
      }
      if (errors) {
        toast(errors, { type: "error" });
      }
    };

    notify();
  }, [errors]);

  useEffect(() => {
    const notify = () => {
      if (passwordError) {
        toast(passwordError, { type: "error" });
        setPasswordError({});
      }
    };

    notify();
  }, [passwordError]);

  return (
    <Box
      position="absolute"
      top="38%"
      width="92%"
      height="55vh"
      borderRadius="10px"
      overflow="hidden"
      bgcolor={theme.palette.background.default}
      borderColor={"#000000"}
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid
            item
            md={3}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={imageURL}
              alt="Profile Picture"
              sx={{ width: 200, height: 200, mb: 3, ml: 7 }}
            />
            <CloudinaryUploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <Paper
                    onClick={handleOnClick}
                    sx={{
                      position: "absolute",
                      top: "25%",
                      left: "23.2%",
                      transform: "translate(-50%, -50%)",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#757575",
                      },
                    }}
                  >
                    <CreateIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.background.default,
                      }}
                    />
                  </Paper>
                );
              }}
            </CloudinaryUploadWidget>
            {editMode ? (
              <TextField
                id="username"
                label="Username"
                value={newUsername}
                onChange={handleUsernameChange}
                color="warning"
                sx={{ ml: 7 }}
              />
            ) : (
              <>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  align="center"
                  color="primary"
                  sx={{ ml: 6 }}
                >
                  {username}
                </Typography>
              </>
            )}
          </Grid>
          <Grid
            item
            md={1}
            sx={{ display: "flex", justifyContent: "center" }}
          ></Grid>
          <Divider
            flexItem
            variant="middle"
            orientation="vertical"
            sx={{ height: "100%" }}
          />
          <Grid
            item
            md={7}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingLeft: "24px",
              }}
            >
              {editMode ? (
                <>
                  <Typography
                    variant="body2"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Bio:
                  </Typography>
                  <TextField
                    id="bio"
                    value={userBio}
                    rows={3}
                    onChange={handleBioChange}
                    multiline
                    color="warning"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Bio:
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="primary"
                    sx={{ mb: 3, wordWrap: "break-word", maxWidth: "100%" }}
                  >
                    {bio ? bio : "No bio available"}
                  </Typography>
                </>
              )}
              {editMode ? (
                <>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Email Address:
                  </Typography>
                  <TextField
                    id="email"
                    defaultValue={email}
                    onChange={handleEmailChange}
                    color="warning"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Phone Number:
                  </Typography>
                  <TextField
                    id="phone"
                    defaultValue={phoneNumber}
                    onChange={handlePhoneNumChange}
                    color="warning"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Email Address:
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="primary"
                    sx={{ mb: 3 }}
                  >
                    {email}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Phone Number:
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="primary"
                    sx={{ mb: 3 }}
                  >
                    {phoneNumber}
                  </Typography>
                </>
              )}
              {editMode ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <CustomButtonWhiteSquare
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                    text="Save"
                    sx={{ width: 200 }}
                  />
                  <CustomButtonWhiteSquare
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setEditMode(false);
                      setNewUsername(username);
                      setNewEmail(email);
                      setNewPhoneNumber(phoneNumber);
                      setUserBio(bio);
                    }}
                    text="Cancel"
                    sx={{
                      width: 200,
                    }}
                  />
                  <CustomButtonWhiteSquare
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    text="Change Password"
                    sx={{ width: 200 }}
                  />
                </Box>
              ) : (
                <CustomButtonWhiteSquare
                  variant="outlined"
                  color="primary"
                  onClick={() => setEditMode(true)}
                  text="Edit"
                  sx={{ width: 200 }}
                />
              )}
            </Box>

            <Dialog open={openModal} onClose={handleClose}>
              <DialogTitle>Change Password</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="newPassword"
                  label="New Password"
                  color="warning"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <TextField
                  margin="dense"
                  id="verifyPassword"
                  label="Verify Password"
                  color="warning"
                  type="password"
                  fullWidth
                  value={verifyPassword}
                  onChange={handleVerifyPasswordChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSavePassword} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
