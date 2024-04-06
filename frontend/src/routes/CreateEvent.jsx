import React, { useState } from "react";
import theme from "../themes/theme";
import {
  Grid,
  TextField,
  Divider,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../hooks/AuthProvider";
import CustomButtonWhiteSquare from "../components/CustomButtonWhiteSquare";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { notify } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateEvent() {
  const { user } = useAuth();
  const [imageURL, setImageURL] = useState("empty");
  const [eventDate, setEventDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

  const datePickerStyles = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.background.tertiary, // Change border color based on focus state
    },
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const validateCreateEvent = () => {
    if (title === "") {
      notify("Please enter a title", "error");
      return;
    }
    if (location === "") {
      notify("Please enter a location", "error");
      return;
    }
    if (description === "") {
      notify("Please enter a description", "error");
      return;
    }
    if (eventDate === null) {
      notify("Please enter an event date", "error");
      return;
    }
    if (deadlineDate === null) {
      notify("Please enter a deadline date", "error");
      return;
    }
    if (eventDate < new Date()) {
      notify("Please enter a future event date", "error");
      return;
    }
    if (deadlineDate < new Date()) {
      notify("Please enter a future deadline date", "error");
      return;
    }
    if (deadlineDate > eventDate) {
      notify("Deadline date must be before event date", "error");
      return;
    }
    if (imageURL === "empty") {
        notify("Please upload an event photo", "error");
        return;
    }
    setOpenModal(true);
  };

  const handleCreateEvent = async () => {
    axios
      .post(
        "http://localhost:3000/api/createEvent",
        {
            title: title,
            location: location,
            description: description,
            date: eventDate,
            deadline: deadlineDate,
            eventPic: imageURL,
            host: user._id,
        },
      )
      .then((response) => {
        toast("Event created successfully!", { type: "success" });
        console.log(response.data);
        navigate("/manage-events");
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        toast("An error occurred while creating the event.", { type: "error" });
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={4}>
        {/* Left side: Picture */}
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              borderRadius: "30px",
              padding: "20px",
              marginLeft: "50px",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "15%",
                left: "10%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                fontSize: "2rem",
                letterSpacing: "2px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
              Create Event
            </Typography>
            {imageURL == "empty" ? (
              <CloudinaryUploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOnClick}
                      sx={{
                        height: "600px",
                        backgroundColor: "#FFFFFF",
                        color: theme.palette.text.secondary,
                        border: "1px dashed #181B13",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#DFDFDF",
                          borderColor: theme.palette.background.tertiary,
                        },
                        px: "16px",
                        py: "16px",
                        fontSize: "24px",
                        cursor: "pointer",
                        textTransform: "initial",
                      }}
                    >
                      Upload Event Photo
                    </Button>
                  );
                }}
              </CloudinaryUploadWidget>
            ) : (
              <Box
                id="image"
                component="img"
                fullWidth
                sx={{
                  height: "600px",
                  width: "100%",
                  border: "1px dashed #181B13",
                  borderRadius: "10px",
                  alignSelf: "flex-start",
                  "&:hover": { backgroundColor: "#FFFFFF" },
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  objectFit: "contain",
                }}
                src={imageURL}
                alt="Uploaded Profile Picture"
              />
            )}
          </Box>
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
        {/* Right side: Input fields */}
        <Grid
          item
          md={7}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          margin={8}
        >
          <Typography
            variant="body2"
            align="left"
            color="primary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Title:
          </Typography>
          <TextField
            fullWidth
            value={title}
            onChange={handleTitleChange}
            color="warning"
            variant="outlined"
            margin="dense"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body2"
            align="left"
            color="primary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Location:
          </Typography>
          <TextField
            fullWidth
            value={location}
            onChange={handleLocationChange}
            color="warning"
            variant="outlined"
            margin="dense"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body2"
            align="left"
            color="primary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Description:
          </Typography>
          <TextField
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            color="warning"
            multiline
            rows={4}
            margin="dense"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body2"
            align="left"
            color="primary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Event Date:
          </Typography>
          <DatePicker
            value={eventDate}
            onChange={(newValue) => setEventDate(newValue)}
            sx={{ mb: 2, width: "100%", ...datePickerStyles }}
          />
          <Typography
            variant="body2"
            align="left"
            color="primary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Registration Deadline:
          </Typography>
          <DatePicker
            value={deadlineDate}
            onChange={(newValue) => setDeadlineDate(newValue)}
            sx={{
              mb: 2,
              width: "100%",
              ...datePickerStyles,
            }}
          />
          <CustomButtonWhiteSquare
            onClick={validateCreateEvent}
            variant="contained"
            color="primary"
            text="Confirm Event"
            sx={{ marginTop: 4, width: 200 }}
          />

          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle
              sx={{
                fontWeight: "bold",
              }}
            >
              Confirm Event Creation
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to create this event?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenModal(false)}
                color="primary"
                sx={{
                  fontWeight: "normal",
                }}
              >
                Not yet
              </Button>
              <Button
                onClick={handleCreateEvent}
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.background.tertiary,
                }}
              >
                Do It!
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}
