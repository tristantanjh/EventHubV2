import React, { useEffect } from "react";
import theme from "../themes/theme";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Terms and Conditions | EventHub";
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
        Terms and Conditions
      </Typography>
      <Typography color="primary">
        Please do not use our app without permission
      </Typography>
    </div>
  );
}
