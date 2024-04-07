import React from "react";
import {
  Avatar,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FaceIcon from "@mui/icons-material/Face";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import theme from "../themes/theme";
import { useAuth } from "../hooks/AuthProvider";
import CustomButtonWhiteSquare from "./CustomButtonWhiteSquare";
import { notify } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function EventCard(props) {
  const { user, updateUser } = useAuth();
  const [hostName, setHostName] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [host, setHost] = useState("");
  const [participants, setParticipants] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openUnregisterModal, setOpenUnregisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getEventWithId`, {
        params: {
          eventId: props.eventId,
        },
      })
      .then((response) => {
        setTitle(response.data.event.title);
        setDescription(response.data.event.description);
        setDate(response.data.event.date);
        const deadline = new Date(response.data.event.deadline);
        const currentDate = new Date();
        const differenceMs = deadline.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        setDeadline(daysLeft > 0 ? daysLeft : 0);
        setDeadlineDate(response.data.event.deadline);
        fetchUser(response.data.event.host).then((user) => {
          setHost(user._id);
          setHostName(user.username);
        });
        setHost(response.data.event.host);
        setLocation(response.data.event.location);
        setEventImage(response.data.event.eventPic);
        const attendees = response.data.event.attendees;
        const registrants = response.data.event.registrants;
        setParticipants(attendees.length + registrants.length);
      });
  }, [props.eventId]);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getUserWithId",
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = () => {
    axios
      .delete(`http://localhost:3000/api/deleteEvent`, {
        params: {
          eventId: props.eventId,
        },
      })
      .then((response) => {
        notify(<Typography>Event deleted successfully</Typography>, "success");
        updateUser(response.data.user);
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
        notify(<Typography>Error deleting event</Typography>, "error");
      });
  };

  const handleJoinEvent = () => {
    axios
      .put(`http://localhost:3000/api/registerForEvent`, {
        eventId: props.eventId,
        userId: user._id,
      })
      .then((response) => {
        notify(
          <Typography>Event joined successfully, let's gooooo!</Typography>,
          "success"
        );
        updateUser(response.data.updatedUser);
        setOpenInfoModal(false);
        navigate("/event-history");
      })
      .catch((error) => {
        console.log(error);
        notify(<Typography>Error joining event</Typography>, "error");
      });
  };

  const handleUnregisterEvent = () => {
    axios
      .put(`http://localhost:3000/api/unregisterForEvent`, {
        eventId: props.eventId,
        userId: user._id,
      })
      .then((response) => {
        notify(
          <Typography>We hope to see you at another event soon!</Typography>,
          "success"
        );
        updateUser(response.data.updatedUser);
        setOpenInfoModal(false);
        navigate("/event-history");
      })
      .catch((error) => {
        console.log(error);
        notify(
          <Typography>Error unregistering from event</Typography>,
          "error"
        );
      });
  };

  return (
    <Grid
      container
      spacing={8}
      alignItems="center"
      sx={{
        marginBottom: "80px",
      }}
    >
      <Grid item>
        <Box
          component="img"
          alt="Event Image"
          src={eventImage}
          sx={{
            width: 250,
            height: 180,
            borderRadius: 4,
            objectFit: "cover", // Keeps the aspect ratio and fills the container
            objectPosition: "center",
          }} // Customize styles as needed
        />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: "bold",
                fontSize: "1.8rem",
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            gap={3}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 3,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                gap: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "30px",
                maxHeight: "5px",
                color: deadline > 0 ? "secondary.main" : "text.disabled",
                backgroundColor:
                  deadline > 0
                    ? theme.palette.background.tertiary
                    : "text.disabled",
              }}
            >
              {deadline > 0 ? (
                <HourglassTopIcon
                  sx={{
                    height: "20px",
                  }}
                />
              ) : (
                <HourglassEmptyIcon
                  sx={{
                    height: "20px",
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: deadline > 0 ? "secondary.main" : "text.disabled",
                }}
              >
                {deadline > 0
                  ? `${deadline} day${deadline === 1 ? "" : "s"} left`
                  : "0 days left"}
              </Typography>
            </Paper>
            <Box
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <LocationOnIcon color="primary" />
              <Typography variant="body2" color="primary">
                {location}
              </Typography>
            </Box>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 1,
                }}
              >
                <Typography color="primary">{participants}</Typography>{" "}
                participants
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          position: "relative",
          top: "33%",
          left: "-2%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
      >
        <Divider
          orientation="vertical"
          sx={{
            position: "fixed",
            top: "70%",
            left: "-40%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            zIndex: 2,
          }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column" }} // Customize styles as needed
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <FaceIcon color="primary" />
            <Typography variant="body2" color="primary">
              {hostName === user.username ? "You" : hostName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <CalendarTodayIcon color="primary" />
            <Typography variant="body2" color="primary">
              {date.slice(0, 10)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex",
              gap: 1,
              flexDirection: "row",
            }}
          >
            <CustomButtonWhiteSquare
              onClick={() => setOpenInfoModal(true)}
              text="Details"
            />
            {props.delete ? (
              <CustomButtonWhiteSquare
                onClick={() => setOpenDeleteModal(true)}
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  backgroundColor: theme.palette.background.secondary,
                  color: "secondary.main",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(
                      theme.palette.background.secondary,
                      0.6
                    ),
                  },
                }}
                text="Delete"
              />
            ) : null}
            {props.unregister && deadline > 0 ? (
              <CustomButtonWhiteSquare
                onClick={() => setOpenUnregisterModal(true)}
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  backgroundColor: theme.palette.background.secondary,
                  color: "secondary.main",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(
                      theme.palette.background.secondary,
                      0.6
                    ),
                  },
                }}
                text="Unregister"
              />
            ) : null}
          </Box>
        </Box>
      </Grid>
      <Divider
        sx={{
          position: "relative",
          top: "14%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          zIndex: 2,
        }}
      />

      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
          }}
        >
          Confirm Event Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
          <Typography
            color={theme.palette.background.secondary}
            fontWeight={600}
          >
            THIS ACTION IS IRREVERSIBLE!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteModal(false)}
            color="primary"
            sx={{
              fontWeight: "normal",
            }}
          >
            No
          </Button>
          <Button
            onClick={handleDeleteEvent}
            sx={{
              fontWeight: "bold",
              color: theme.palette.background.secondary,
            }}
          >
            DELETE IT!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUnregisterModal}
        onClose={() => setOpenUnregisterModal(false)}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
          }}
        >
          Confirm Event Unregistration
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to unregister for this event?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenUnregisterModal(false)}
            color="primary"
            sx={{
              fontWeight: "normal",
            }}
          >
            I made a mistake...
          </Button>
          <Button
            onClick={handleUnregisterEvent}
            sx={{
              fontWeight: "bold",
              color: theme.palette.background.secondary,
            }}
          >
            Unregister Me!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInfoModal} onClose={() => setOpenInfoModal(false)}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            alt="Event Image"
            src={eventImage}
            sx={{
              width: 550,
              height: 180,
              borderRadius: 4,
              objectFit: "cover", // Keeps the aspect ratio and fills the container
              objectPosition: "center",
            }} // Customize styles as needed
          />
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography marginBottom={4}>{description}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Registration Deadline:
              </Typography>
              <Typography>{deadlineDate.slice(0, 10)}</Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Date:
              </Typography>
              <Typography>{date.slice(0, 10)}</Typography>
            </Box>
          </Box>

          <Divider orientation="horizontal" sx={{ marginBottom: "1rem" }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Location:
              </Typography>
              <Typography>{location}</Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Host:
              </Typography>
              <Typography>
                {hostName === user.username ? "You" : hostName}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Participants:
              </Typography>
              <Typography>{participants}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {hostName === user.username ? (
            <Button
              onClick={() => navigate(`/update-attendance/${props.eventId}`)}
              color="primary"
              sx={{
                fontWeight: "normal",
              }}
            >
              Update Attendance
            </Button>
          ) : user.registeredEvents.includes(props.eventId) ? (
            <Typography
              variant="body1"
              color="textSecondary"
              marginBottom={1}
              marginRight={1}
            >
              You are already part of this event!
            </Typography>
          ) : (
            <Button
              onClick={handleJoinEvent}
              color="primary"
              sx={{
                fontWeight: "normal",
              }}
            >
              Join Event
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
