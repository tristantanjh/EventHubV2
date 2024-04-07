import * as React from "react";
import logo from "../assets/logo.png";

import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Divider,
  ListItemIcon,
  MenuItem,
  Drawer,
  alpha,
  Avatar,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../hooks/AuthProvider";
import theme from "../themes/theme";
import CustomButtonWhiteSquare from "./CustomButtonWhiteSquare";
import SearchBar from "./SearchBar.jsx";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { logout } = useAuth();
  const { user } = useAuth();
  const profilePic = user.profilePic;
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      style={{
        boxShadow: "5",
        color: "#076365",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: theme.palette.background.default,
          backgroundImage: "none",
          pb: 4.5,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              maxHeight: 40,
              paddingRight: 0,
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <a href="/">
                <Box
                  display={{ md: "flex" }}
                  id="image"
                  component="img"
                  sx={{
                    mt: 4,
                    mr: "1vw",
                    alignSelf: "flex-start",
                    height: 50,
                    objectFit: "cover",
                  }}
                  src={logo}
                  alt="EventHub Logo."
                />
              </a>
              <Box
                sx={{
                  mt: 4,
                  mr: 2,
                }}
              >
                {path === "/home" ? <SearchBar /> : null}
              </Box>
            </Box>
            {path === "/create-event" ? null : (
              <Box
                sx={{
                  mt: 4,
                  mr: 2,
                }}
              >
                <Paper
                  elevation={3}
                  onClick={() => {
                    navigate("/create-event");
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 24px 8px 24px",
                    height: "42px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.background.secondary,
                    boxShadow: 1,
                    color: theme.palette.secondary.main,
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette.background.secondary,
                        0.6
                      ),
                    },
                  }}
                >
                  <AddIcon sx={{ mr: 1 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Create Event
                  </Typography>
                </Paper>
              </Box>
            )}

            <Box
              sx={{
                mt: 4,
              }}
            >
              <Box sx={{ flexGrow: 1 }} onClick={() => setDrawerOpen(true)}>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    borderColor: theme.palette.background.secondary,
                    p: "4px",
                    height: { xs: "38px", sm: "50px" },
                    width: { xs: "70px", sm: "100px" },
                    maxWidth: "100px",
                    marginLeft: "auto",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: alpha("#a6a6a6", 0.6) },
                  }}
                >
                  <Box
                    sx={{
                      mt: 1,
                      mr: { xs: "3px", sm: "7px" },
                    }}
                  >
                    <MenuIcon fontSize="small" />
                  </Box>
                  <Avatar
                    alt="Profile Image"
                    src={profilePic}
                    sx={{
                      width: { xs: 24, sm: 28, md: 32 },
                      height: { xs: 24, sm: 28, md: 32 },
                      ml: { xs: "3px", sm: "7px" },
                    }}
                  />
                </Paper>
              </Box>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  id="drawerContent"
                  sx={{
                    minWidth: "40vw",
                    p: 2,
                    flexGrow: 1,
                    color: theme.palette.background.secondary,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  ></Box>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      setDrawerOpen(false);
                    }}
                    sx={{
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                    }}
                  >
                    <ListItemIcon
                      style={{
                        marginLeft: "-3px",
                        filter: "grayscale(100%)",
                      }}
                    >
                      <PermIdentityIcon
                        style={{ width: "30px", height: "30px" }}
                      />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    PROFILE SETTINGS
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/manage-events");
                      setDrawerOpen(false);
                    }}
                    sx={{
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                    }}
                  >
                    <ListItemIcon
                      style={{
                        marginLeft: "-3px",
                        filter: "grayscale(100%)",
                      }}
                    >
                      <EventIcon style={{ width: "30px", height: "30px" }} />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "1px",
                        mr: "15px",
                      }}
                    />
                    MANAGE EVENTS
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/event-history");
                      setDrawerOpen(false);
                    }}
                    sx={{
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                    }}
                  >
                    <ListItemIcon
                      style={{
                        marginLeft: "-3px",
                        filter: "grayscale(100%)",
                      }}
                    >
                      <HistoryIcon style={{ width: "30px", height: "30px" }} />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    EVENT HISTORY
                  </MenuItem>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <CustomButtonWhiteSquare
                      text="Log Out"
                      onClick={handleLogout}
                      sx={{
                        width: "150px",
                      }}
                    />
                  </div>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
