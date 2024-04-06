import React from "react";
import ImageCard from "../components/profile/ImageCard";
import InfoCard from "../components/profile/InfoCard";
import { Box } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";
import theme from "../themes/theme";

export default function Profile() {
  return (
    <>
      <ImageCard />
      <InfoCard />
    </>
  );
}
