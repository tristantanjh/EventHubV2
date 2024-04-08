import React from "react";
import theme from "../themes/theme";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        fontFamily: "nunito, sans-serif",
        fontSize: "14px",
      }}
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/tristantanjh/EventHubV2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: "14px",
          "&:hover": {
            color: theme.palette.background.tertiary, // Change the hover color here
            textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
          },
        }}
      >
        EventHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
