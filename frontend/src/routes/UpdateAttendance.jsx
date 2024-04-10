import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";
import theme from "../themes/theme";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notify } from "../utils/utils";
import DraggableUserItem from "../components/DraggableUserItem";
import CustomButtonWhiteSquare from "../components/CustomButtonWhiteSquare";

export default function UpdateAttendance() {
  const { user } = useAuth();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [itemsLeft, setItemsLeft] = useState([]);
  const [itemsRight, setItemsRight] = useState([]);
  const [draggedItem, setDraggedItem] = useState({});
  const [originalLeft, setOriginalLeft] = useState([]);
  const [originalRight, setOriginalRight] = useState([]);

  const arraysEqual = (arr1, arr2) => {
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    return (
      sortedArr1.length === sortedArr2.length &&
      sortedArr1.every((value, index) => value === sortedArr2[index])
    );
  };

  const onDrag = (event, item) => {
    event.preventDefault();
    setDraggedItem(item);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, targetContainer) => {
    if (targetContainer === "left") {
      if (!itemsLeft.find((userId) => userId === draggedItem._id)) {
        setItemsLeft([...itemsLeft, draggedItem._id]);
        setItemsRight(
          itemsRight.filter((userId) => userId !== draggedItem._id)
        );
      }
    } else if (targetContainer === "right") {
      if (!itemsRight.find((userId) => userId === draggedItem._id)) {
        setItemsRight([...itemsRight, draggedItem._id]);
        setItemsLeft(itemsLeft.filter((userId) => userId !== draggedItem._id));
      }
    }
    setDraggedItem({});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getEventWithId`, {
        params: {
          eventId: eventId,
        },
      })
      .then((response) => {
        setEvent(response.data.event);
        setItemsLeft(response.data.event.registrants || []);
        setItemsRight(response.data.event.attendees || []);
        setOriginalLeft(response.data.event.registrants || []);
        setOriginalRight(response.data.event.attendees || []);
      })
      .catch((error) => {
        console.error(error);
        notify("Failed to fetch event details", "error");
      });
  }, []);

  const handleUpdateAttendance = () => {
    axios
      .put(`http://localhost:3000/api/handleUpdateAttendance`, {
        eventId: eventId,
        registrants: itemsLeft,
        attendees: itemsRight,
      })
      .then((response) => {
        notify(<Typography>Successfully updated attendance!</Typography>, "success");
        setOriginalLeft(itemsLeft);
        setOriginalRight(itemsRight);
      })
      .catch((error) => {
        console.error(error);
        notify("Failed to update attendance", "error");
      });
  };

  return (
    <>
      <Typography
        sx={{
          position: "absolute",
          top: "18%",
          left: "17%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "2rem",
          letterSpacing: "2px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
          zIndex: 1,
        }}
      >
        Manage Attendance
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "85%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "2rem",
          letterSpacing: "2px",
          gap: "20px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomButtonWhiteSquare
          text="Save Changes"
          disabled={
            arraysEqual(originalLeft, itemsLeft) &&
            arraysEqual(originalRight, itemsRight)
          }
          onClick={handleUpdateAttendance}
        />
      </Box>
      <Divider
        sx={{
          position: "absolute",
          top: "23%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          zIndex: 2,
        }}
      />
      <Box
        position="absolute"
        top="11%"
        width="92%"
        height="82vh"
        borderRadius="10px"
        overflow="hidden"
        bgcolor={theme.palette.background.default}
        borderColor={"#000000"}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
      >
        <Box sx={{ height: "100px" }}></Box>
        <Box
          sx={{
            padding: "40px",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "8px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Track color
              borderRadius: "8px", // Border radius of the track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Thumb color
              borderRadius: "8px", // Border radius of the thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Thumb color on hover
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography
              color="primary"
              fontSize="24px"
              fontWeight={600}
              marginBottom={2}
            >
              Registered Users
            </Typography>
            <Typography
              color="primary"
              fontSize="24px"
              fontWeight={600}
              marginBottom={2}
            >
              Attended Users
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                border: "1px solid black",
                width: "100%",
                height: "94%",
              }}
              onDrop={(event) => onDrop(event, "left")}
              onDragOver={(event) => onDragOver(event)}
            >
              {itemsLeft.length === 0 ? (
                <Typography color="primary" textAlign="center" fontWeight="bold" marginTop={2} fontSize={16}>
                  There are no registrants yet ☹
                </Typography>
              ) : (
                itemsLeft.map((userId) => (
                  <DraggableUserItem
                    key={userId}
                    onDrag={onDrag}
                    userId={userId}
                  />
                ))
              )}
            </Box>
            <Box
              sx={{
                border: "1px solid black",
                width: "100%",
                height: "94%",
                borderLeft: "none",
              }}
              onDrop={(event) => onDrop(event, "right")}
              onDragOver={(event) => onDragOver(event)}
            >
              {itemsRight.length === 0 ? (
                <Typography color="primary" textAlign="center" fontWeight="bold" marginTop={2} fontSize={16}>
                  There are no attendees yet ☹
                </Typography>
              ) : (
                itemsRight.map((userId) => (
                  <DraggableUserItem
                    key={userId}
                    onDrag={onDrag}
                    userId={userId}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
