import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import axios from "axios";
import { notify } from "../utils/utils";
import theme from "../themes/theme";

export default function DraggableUserItem({ onDrag, userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getUserWithId`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
        notify(<Typography>Failed to fetch user details</Typography>, "error");
      });
  }, []);

  return (
    <Box
      draggable
      onDrag={(event) => onDrag(event, user)}
      sx={{
        padding: "10px",
        cursor: "pointer",
        border: `1px solid ${theme.palette.text.secondary}`,
        backgroundColor: "lightgray",
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Avatar src={user.profilePic} alt={user.username} />
      <Box sx={{ marginLeft: "20px" }}>
        <Typography variant="body1" fontWeight="bold" color="primary">
          {user.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
}
