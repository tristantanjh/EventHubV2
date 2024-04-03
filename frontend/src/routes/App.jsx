import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import theme from "../themes/theme";
import logo from "../assets/logo.png";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

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
            marginLeft: "20px",
          }}
        >
          <ReactTypingEffect
            text={[
              "Create Events\nIn An Instant",
              "Discover Events\nFor Every Occasion",
              "Connect and Interact\nWith Like-Minded People",
              "EventHub\nElevating Occasions, Creating Connections",
            ]}
            speed={70}
            typingDelay={0}
            eraseSpeed={20}
            eraseDelay={2000}
            displayTextRenderer={(text, i) => {
              const splitArray = text.split("\n");
              return (
                <div>
                  <h1>
                    {splitArray[0]?.split("").map((char, i) => (
                      <span
                        key={`${i}-firstHalf`}
                        style={{
                          fontFamily: theme.typography.fontFamily,
                          fontWeight: "bold",
                          fontSize: "3rem",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </h1>
                  <h2>
                    {splitArray[1]?.split("").map((char, i) => (
                      <span
                        key={`${i}-secondHalf`}
                        style={{
                          fontFamily: theme.typography.fontFamily,
                          fontWeight: "normal",
                          fontSize: "2.5rem",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </h2>
                </div>
              );
            }}
          />
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
            onClick={() => navigate("/login")}
            sx={{
              width: "150px",
            }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
            sx={{
              width: "150px",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
