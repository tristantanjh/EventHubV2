import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import theme from "../themes/theme";
import logo from "../assets/logo.png";
import { useNavigate  } from "react-router-dom";

const slogans = [
  { bold: "Create Events", regular: "In An Instant" },
  { bold: "Discover Events", regular: "For Every Occasion" },
  { bold: "Connect and Interact", regular: "With Like-Minded People" },
  { bold: "EventHub", regular: "Elevating Occasions, Creating Connections" },
];

export default function App() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [typingBoldText, setTypingBoldText] = useState("");
  const [typingRegularText, setTypingRegularText] = useState("");
  const { bold, regular } = slogans[currentSloganIndex];
  const navigate = useNavigate();

  useEffect(() => {
    let boldIndex = 0;
    let regularIndex = 0;
    let timer;

    const typeText = () => {
      if (boldIndex < bold.length - 1) {
        if (boldIndex === 0) {
          setTypingBoldText(bold[0]);
        } else if (boldIndex === 2) {
          setTypingBoldText(bold[0] + bold[1] + bold[2]);
        } 

          setTypingBoldText((prevText) => prevText + bold[boldIndex]);
        boldIndex++;
        timer = setTimeout(typeText, 100); // Type next character after 100ms
      } else if (regularIndex < regular.length - 1) {
        if (regularIndex === 0) setTypingRegularText(regular[0]);
        setTypingRegularText((prevText) => prevText + regular[regularIndex]);
        regularIndex++;
        timer = setTimeout(typeText, 100); // Type next character after 100ms
      } else if (currentSloganIndex != slogans.length - 1) {
        clearTimeout(timer); // Clear timer when text is fully typed
        setTimeout(() => {
          setTypingBoldText("");
          setTypingRegularText("");
          setCurrentSloganIndex((prevIndex) =>
            prevIndex === slogans.length - 1 ? 0 : prevIndex + 1
          );
        }, 1000); // Wait 1 second before moving to the next slogan
      }
    };

    typeText();

    return () => clearTimeout(timer); // Cleanup function to clear timer
  }, [currentSloganIndex]);

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        id="image"
        component="img"
        sx={{
          position: "absolute", // Position the logo absolutely
          top: 0, // Align to the top
          left: 0, // Align to the left
          zIndex: 1, // Ensure logo is above other content
          margin: "20px", // Add some margin
          height: "50px",
          objectFit: "cover",
        }}
        src={logo}
        alt="EventHub Logo."
      ></Box>
      <Grid
        item
        xs={7}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginLeft: "20px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {typingBoldText}
          </Typography>
          <Typography
            color="primary"
            sx={{
              marginLeft: "20px",
              textAlign: "left",
              fontSize: "2.5rem",
            }}
          >
            {typingRegularText}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          backgroundColor: theme.palette.background.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontWeight: "900",
            fontSize: "2rem",
          }}
        >
          Get Started
        </Typography>
        <Box
          m={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "150px",
            }}
            onClick={() => navigate("/login")} 
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "150px",
            }}
            onClick={() => navigate("/register")} 
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
