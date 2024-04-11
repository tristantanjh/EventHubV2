import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import theme from "../themes/theme";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function PrivatePolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Private Policy | EventHub";
  }, []);

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
      <Box
        id="image"
        component="img"
        sx={{
          position: "absolute", // Position the logo absolutely
          top: "10%", // Align to the top
          left: "44.8%", // Align to the left
          zIndex: 3, // Ensure logo is above other content
          margin: "20px", // Add some margin
          height: "40px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        src={logo}
        alt="EventHub Logo."
        onClick={() => navigate("/")}
      ></Box>
      <Typography variant="h1" color="primary">
        Private Policy
      </Typography>
      <Typography color="primary">We store your data privately</Typography>
    </div>
  );
}
