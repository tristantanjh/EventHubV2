import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import theme from "../themes/theme";
import { useAuth } from "../hooks/AuthProvider";
import EventCard from "../components/EventCard";

export default function ManageEvents() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Manage My Events | EventHub";
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
        Manage Events
      </Typography>
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
        <Box sx={{height: "110px"}}></Box>
        <Box sx={{
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
        }}>
        {user.hostedEvents.length === 0 ? (
          <Typography color="primary" fontWeight="bold">
            You have not hosted any events yet. Begin your adventure with EventHub by hosting your inaugural event!
          </Typography>
        ) : (
          user.hostedEvents.map((eventId) => (
            <EventCard key={eventId} eventId={eventId} delete={true} />
          ))
        )}
        </Box>

      </Box>
    </>
  );
}
