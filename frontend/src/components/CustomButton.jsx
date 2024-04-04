import React from "react";
import Button from "@mui/material/Button";
import theme from "../themes/theme";

export default function CustomButton(props) {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        py: 1,
        borderRadius: "30px",
        "&:hover": { backgroundColor: theme.palette.background.tertiary },
        width: "100%", // Adjust width on mobile
        maxWidth: "auto", // Max width of the button
        marginLeft: "auto", // Center horizontally
        marginRight: "auto", // Center horizontally
      }}
      {...props}
    >
      {props.text}
    </Button>
  );
}
