import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import Copyright from "../components/Copyright.jsx";
import theme from "../themes/theme.js";
import swal from "sweetalert";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget.jsx";
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
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton.jsx";

export default function Register() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [imageURL, setImageURL] = useState("empty");
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

  useEffect(() => {
    console.log(imageURL); //shows true - updated state
  }, [imageURL]);

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // if (validateForm()) {
    //   try {
    //     const response = await axios.post("http://localhost:3000/createUser", {
    //       username: data.get("username"),
    //       email: data.get("email"),
    //       password: data.get("password"),
    //       profilePic: imageURL, // Assuming imageURL is the URL of the uploaded profile picture
    //     });

    //     login(response.data.user);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error("Error creating user:", error.response.data.message);
    //     handleOpenSnackbar(
    //       "An error occurred while signing you up. Try again or contact our support team for assistance!"
    //     );
    //   }
    // } else {
    //   handleOpenSnackbar("Invalid details entered!");
    //   console.log("Invalid form");
    // }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(formData);
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

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    swal("Success", "Media uploaded", "success");
    console.log(result.info.secure_url);
    const secureUrl = result?.info?.secure_url;

    if (secureUrl) {
      console.log("setURL");
      setImageURL(secureUrl);
      console.log(imageURL);
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Typography fontSize={28} fontWeight={"bold"} color="primary">
        Sign Up for EventHub
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <TextField
            color="warning"
            variant="standard"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              sx: {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
                  WebkitTextFillColor: "black", // Adjust as per your theme
                },
              },
            }}
            sx={{
              my: "10px",
            }}
          />
          <TextField
            color="warning"
            variant="standard"
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            InputProps={{
              sx: {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
                  WebkitTextFillColor: "black", // Adjust as per your theme
                },
              },
            }}
            sx={{
              my: "10px",
            }}
          />
        </Box>

        <TextField
          color="warning"
          variant="standard"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
            "& label": {
              fontFamily: theme.typography.fontFamily,
            },
          }}
        />
        <FormControl
          sx={{ width: "100%", marginTop: "10px" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password" color="warning">
            Password
          </InputLabel>
          <Input
            sx={{}}
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
                  // onMouseDown={handleMouseDownPassword}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          {imageURL == "empty" ? (
            <CloudinaryUploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleOnClick}
                    sx={{
                      height: "150px",
                      backgroundColor: "#FFFFFF",
                      color: theme.palette.text.secondary,
                      border: "1px dashed #181B13",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#DFDFDF",
                        borderColor: theme.palette.background.tertiary,
                      },
                      px: "16px",
                      py: "16px",
                      fontSize: "18px",
                      cursor: "pointer",
                      textTransform: "initial",
                    }}
                  >
                    Upload Your Profile Photo
                  </Button>
                );
              }}
            </CloudinaryUploadWidget>
          ) : (
            <Box
              // display={{ xs: "flex", md: "none" }}
              id="image"
              component="img"
              fullWidth
              sx={{
                height: "150px",
                width: "100%",
                border: "1px dashed #181B13",
                borderRadius: "10px",
                alignSelf: "flex-start",
                "&:hover": { backgroundColor: "#FFFFFF" },
                justifyContent: "flex-start",
                alignItems: "flex-start",
                objectFit: "contain",
              }}
              src={imageURL}
              alt="Uploaded Profile Picture"
            />
          )}
        </div>
        <CustomButton
          disabled={
            !formData.email ||
            !formData.password ||
            !formData.username ||
            imageURL == "empty"
          }
          type="submit"
          text={"Sign Up"}
        />
        <Grid container sx={{ mt: isMobile ? 2.5 : 0 }}>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              href="/login"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: "16px",
                "&:hover": {
                  color: theme.palette.background.tertiary, // Change the hover color here
                  textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
                },
              }}
            >
              Have an account? Log In
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{
            fontSize: "14px",
            display: { xs: "none", md: "inherit" },
            mt: 3,
          }}
        >
          By signing up, you agree to our{" "}
          <Link
            href="/terms-and-conditions"
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              "&:hover": {
                color: theme.palette.background.tertiary, // Change the hover color here
                textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
              },
            }}
          >
            Terms and Conditions
          </Link>{" "}
          and our{" "}
          <Link
            href="/private-policy"
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              "&:hover": {
                color: theme.palette.background.tertiary, // Change the hover color here
                textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
              },
            }}
          >
            Private Policy
          </Link>
        </Typography>
        <Copyright sx={{ display: { xs: "none", md: "inherit" }, mt: 2 }} />
      </Box>
    </div>
  );
}
