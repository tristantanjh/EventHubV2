import React, { useState, useEffect } from "react";
import { Typography, Box, Divider } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider.jsx";
import axios, { all } from "axios";
import EventCard from "../components/EventCard";
import theme from "../themes/theme.js";
import { useSearch } from "../hooks/SearchProvider.jsx";

export default function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const { eventList, setEventList, setFullList } = useSearch();

  const fetchEvents = async () => {
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
      setAllEvents(sortedEvents);
      setEventList(sortedEvents);
      setFullList(sortedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
