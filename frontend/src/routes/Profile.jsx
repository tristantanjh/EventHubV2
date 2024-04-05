import React from "react";
import ImageCard from "../components/profile/ImageCard";
import InfoCard from "../components/profile/InfoCard";
import { Box } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";
import theme from "../themes/theme";

export default function Profile() {
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
      <ImageCard />
      <InfoCard />
    </div>
  );
}
