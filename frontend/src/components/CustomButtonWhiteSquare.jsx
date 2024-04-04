import React from "react";
import Button from "@mui/material/Button";

export default function CustomButtonWhiteSquare(props) {
  return (
    <Button variant="contained" color="secondary" {...props}>
      {props.text}
    </Button>
  );
}
