import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import theme from "../themes/theme";
import { useAuth } from "../hooks/AuthProvider";
import EventCard from "../components/EventCard";
import CustomButtonWhiteSquare from "../components/CustomButtonWhiteSquare";

export default function EventHistory() {
  const { user } = useAuth();
  const [registered, setRegistered] = useState(true);

  useEffect(() => {
    document.title = "My Previous Events | EventHub";
  }, []);

  return (
    <>
      <Typography
        sx={{
          position: "absolute",
          top: "18%",
          left: "15%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "2rem",
          letterSpacing: "2px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
          zIndex: 1,
        }}
      >
        Event History
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "2rem",
          letterSpacing: "2px",
          gap: "20px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomButtonWhiteSquare
          text="Registered Events"
          onClick={() => setRegistered(true)}
          disabled={registered}
        />
        <CustomButtonWhiteSquare
          text="Attended Events"
          onClick={() => setRegistered(false)}
          disabled={!registered}
        />
      </Box>
      <Divider
        sx={{
          position: "absolute",
          top: "23%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          zIndex: 2,
        }}
      />
      <Box
        position="absolute"
        top="11%"
        width="92%"
        height="82vh"
        borderRadius="10px"
        overflow="hidden"
        bgcolor={theme.palette.background.default}
        borderColor={"#000000"}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
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
          {registered ? (
            user.registeredEvents.length === 0 ? (
              <Typography color="primary" fontWeight="bold">
                You are not registered for any events right now. Let's get the party started by registering for an event now!
                </Typography>
                ) : (
                  user.registeredEvents.map((eventId) => (
                    <EventCard key={eventId} eventId={eventId} unregister={true}/>
                  ))
                )
          ) : user.attendedEvents.length === 0 ? (
            <Typography color="primary" fontWeight="bold">
              You have not attended any events yet. Start your journey with
              EventHub by attending your first event!
            </Typography>
          ) : (
            user.attendedEvents.map((eventId) => (
              <EventCard key={eventId} eventId={eventId} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
