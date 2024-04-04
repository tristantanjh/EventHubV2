import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  Grid,
  Link,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import axios from "axios";
import Copyright from "../components/Copyright.jsx";
import theme from "../themes/theme.js";

export default function Login() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // if (validateForm()) {
    //   try {
    //     const response = await axios.post("http://localhost:3000/login", {
    //       email: data.get("email"),
    //       password: data.get("password"),
    //     });

    //     login(response.data.user);

    //     console.log(response.data);
    //   } catch (error) {
    //     if (error.response.status === 401) {
    //       console.error("Invalid username or password.");
    //       handleOpenSnackbar("Invalid username or password.");
    //     } else {
    //       console.error("Error creating user:", error.response.data.message);
    //       handleOpenSnackbar(
    //         error.response.data.message ||
    //           "An error occurred. Please try again."
    //       );
    //     }
    //   }
    // } else {
    //   handleOpenSnackbar("Invalid details entered!");
    //   console.log("Invalid form");
    // }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(formData);
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email format regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(formData.email);
    console.log(formData.password);

    // Check if email is empty or invalid format
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = !formData.email
        ? "Email is required"
        : "Invalid email format";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography fontSize="28px" fontWeight={"bold"} color="primary">
        Welcome Back to EventHub
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          color="warning"
          variant="standard"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            sx: {
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
                WebkitTextFillColor: theme.palette.text.primary,
              },
              fontFamily: theme.typography.fontFamily,
            },
          }}
          sx={{
            marginBottom: "20px",
            "& label": {
              fontFamily: theme.typography.fontFamily,
            },
          }}
        />
        <FormControl
          sx={{ width: "100%", marginBottom: "20px" }}
          variant="standard"
        >
          <InputLabel
            htmlFor="standard-adornment-password"
            color="warning"
            sx={{
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Password
          </InputLabel>
          <Input
            sx={{
              fontFamily: theme.typography.fontFamily,
            }}
            onChange={handleChange}
            error={Boolean(errors.password)}
            color="warning"
            name="password"
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {Boolean(errors.password) && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          
          disabled={!formData.email || !formData.password}
          sx={{
            mt: 3,
            mb: 2,
            py: isMobile ? 1.5 : 1,
            fontFamily: "open sans, sans-serif",
            borderRadius: "30px",
            // backgroundColor: theme.palette.background.secondary,
            "&:hover": { backgroundColor: theme.palette.background.tertiary },
            position: isMobile ? "fixed" : "none", // Position fixed on mobile
            bottom: isMobile ? "20px" : "auto", // Adjust bottom position on mobile
            left: isMobile ? "50%" : "0",
            transform: isMobile ? "translateX(-50%)" : "0",
            width: isMobile ? "calc(100% - 40px)" : "100%", // Adjust width on mobile
            maxWidth: isMobile ? "400px" : "auto", // Max width of the button
            marginLeft: "auto", // Center horizontally
            marginRight: "auto", // Center horizontally
          }}
        >
          Sign In
        </Button>
        <Grid container sx={{ mt: isMobile ? 2.5 : 0 }}>
          <Grid item xs>
            {/* <Link
              href="#"
              color="inherit"
              sx={{
                fontFamily: "nunito, sans-serif",
                fontSize: "14px",
                "&:hover": {
                  color: "#388e3c", // Change the hover color here
                  textDecorationColor: "#388e3c", // Change the underline color here
                },
              }}
            >
              Forgot password?
            </Link> */}
          </Grid>
          <Grid item>
            <Link
              href="/register"
              color="primary"
              sx={{
                fontFamily: "nunito, sans-serif",
                fontSize: "14px",
                "&:hover": {
                  color: theme.palette.background.tertiary, // Change the hover color here
                  textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
                },
              }}
            >
              Register
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ display: { xs: "none", md: "inherit" }, mt: 5 }} />
      </Box>
    </div>
  );
}
