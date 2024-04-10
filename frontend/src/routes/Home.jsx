import React, { useState, useEffect } from "react";
import { Typography, Box, Divider, Paper } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider.jsx";
import axios, { all } from "axios";
import EventCard from "../components/EventCard";
import theme from "../themes/theme.js";
import { useSearch } from "../hooks/SearchProvider.jsx";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [updatedEventList, setUpdatedEventList] = useState([]);
  const [showRefreshPopup, setShowRefreshPopup] = useState(true);
  const { eventList, setEventList, setFullList } = useSearch();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getAllEvents"
      );
      const events = response.data.events;
      const sortedEvents = events
        .slice()
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .filter((event) => new Date(event.deadline) > new Date());
      setUpdatedEventList(sortedEvents);
      setAllEvents(sortedEvents);
      setEventList(sortedEvents);
      setFullList(sortedEvents);
      setShowRefreshPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(fetchNewEvents, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchNewEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getAllEvents"
      );
      // console.log(response.data);
      const events = response.data.events;
      const sortedEvents = events
        .slice()
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .filter((event) => new Date(event.deadline) > new Date());
      setUpdatedEventList(sortedEvents);

      if (updatedEventList.length !== allEvents.length) {
        setShowRefreshPopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (updatedEventList.length !== allEvents.length) {
      setShowRefreshPopup(true);
    }
  }, [updatedEventList]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "15%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          letterSpacing: "2px",
          fontWeight: "bold",
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.text.secondary,
          zIndex: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={30}
          color="secondary"
          letterSpacing={0.2}
        >
          Welcome to EventHub! Find events near you or create your own.
        </Typography>
      </Box>
      <Box
        position="absolute"
        top="13.5%"
        width="92%"
        height="82vh"
        borderRadius="10px"
        overflow="hidden"
      >
        <Box sx={{ height: "110px" }}></Box>
        <Box
          sx={{
            padding: "40px",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "8px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Track color
              borderRadius: "8px", // Border radius of the track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Thumb color
              borderRadius: "8px", // Border radius of the thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Thumb color on hover
            },
          }}
        >
          {showRefreshPopup ? (
            <Paper
              elevation={3}
              style={{
                padding: "5px 20px 5px 20px",
                borderRadius: "90px",
                textAlign: "center",
                position: "absolute",
                backgroundColor: theme.palette.background.tertiary,
                bottom: "82%",
                left: "50%",
                transform: "translate(-50%, 50%)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={() => fetchEvents()}
            >
              <RefreshIcon color="secondary" />
              <Typography variant="h6" color="secondary">
                New Events Found!
              </Typography>
            </Paper>
          ) : null}
          {allEvents.length == 0 && (
            <Typography color="primary" fontWeight="bold">
              There are no events available at the moment. Create one now!
            </Typography>
          )}
          {eventList.length === 0 ? (
            <Typography color="primary" fontWeight="bold">
              There are no events matching your search. Create one now!
            </Typography>
          ) : (
            eventList.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
