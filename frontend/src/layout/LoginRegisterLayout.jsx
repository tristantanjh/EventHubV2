import { Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import theme from "../themes/theme";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Box } from "@mui/material";

export default function LoginRegisterLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <video
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "1",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          filter: "blur(10px)",
        }}
        autoPlay
        muted
        loop
      >
        <source
          src={
            "https://media.istockphoto.com/id/1161129424/video/cheerful-entrepreneurs-shaking-hands-during-break.mp4?s=mp4-640x640-is&k=20&c=ile1nfUsvYed1FTSO5kDCRB2iMPg644XlM83JzcWK9A="
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Suspense fallback={<LinearProgress />}>
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
        <Box
          sx={{
            zIndex: "2",
            borderRadius: "8px", // Add border radius
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add drop shadow
            padding: "20px",
            backgroundColor: theme.palette.background.default,
            width: "500px",
            height: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0.8",
          }}
        >
          <Outlet />
        </Box>
      </Suspense>
    </Box>
  );
}
