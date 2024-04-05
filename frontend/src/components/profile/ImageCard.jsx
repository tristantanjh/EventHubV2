import React from "react";
import { Box } from "@mui/material";
import image from "../../assets/image-card.jpg";

export default function ImageCard() {
  return (
    <Box
      position="absolute"
      top="12%"
      width="95%"
      height="30vh"
      borderRadius="10px"
      overflow="hidden"
      bgcolor="lightgrey" // Change this to your desired background color or remove it
      borderColor={"#000000"} 
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <img
        src={image}
        alt="Image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(70%)",
        }}
      />
    </Box>
  );
}
