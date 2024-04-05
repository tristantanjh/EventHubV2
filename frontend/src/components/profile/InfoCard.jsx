import React, { useState } from "react";
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
} from "@mui/material";
import theme from "../../themes/theme";
import CreateIcon from "@mui/icons-material/Create";
import { useAuth } from "../../hooks/AuthProvider";
import CustomButtonWhiteSquare from "../CustomButtonWhiteSquare";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import swal from "sweetalert";

export default function InfoCard() {
  const { user } = useAuth();
  const { username, profilePic, email, password, phoneNumber, bio } = user;
  const [userBio, setUserBio] = useState(bio || "");
  const [newUsername, setNewUsername] = useState(username);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

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
      console.log("setURL");
      setImageURL(secureUrl);
      console.log(imageURL);
    }
  }

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleBioChange = (e) => {
    setUserBio(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleChangePassword = () => {
    // Implement logic to change password
    console.log("New password:", newPassword);
    console.log("Verify password:", verifyPassword);
    setNewPassword(""); // Clear the input fields
    setVerifyPassword("");
    setOpenModal(false); // Close the dialog
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleSaveBio = () => {
    // Implement your logic to save the bio data
    console.log("Bio saved:", bio);
    setEditMode(false); // Exit edit mode after saving
  };

  return (
    <Box
      position="absolute"
      top="38%"
      width="92%"
      height="54vh"
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
              src={profilePic}
              alt="Profile Picture"
              sx={{ width: 200, height: 200, mb: 3, ml: 6 }}
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
                      left: "23%",
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
                sx={{ ml: 6 }}
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
                    value={bio}
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
                    sx={{ mb: 3 }}
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
                    onClick={handleSaveBio}
                    text="Save"
                    sx={{ width: 200 }}
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
                <Button onClick={handleChangePassword} color="primary">
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
