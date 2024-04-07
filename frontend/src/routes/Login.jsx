import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import axios from "axios";
import Copyright from "../components/Copyright.jsx";
import CustomButton from "../components/CustomButton.jsx";
import theme from "../themes/theme.js";
import { toast } from "react-toastify";
import { notify } from "../utils/utils.js";
import { validateForm } from "../utils/utils.js";
import bcrypt from "bcryptjs";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const plainTextPassword = data.get("password");
    const { valid, newErrors } = validateForm(formData);

    if (valid) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getUserWithEmail",
          {
            params: {
              email: data.get("email"),
            },
          }
        );

        console.log(response.data.user.password);
        const passwordMatch = bcrypt.compareSync(
          plainTextPassword,
          response.data.user.password
        );

        // const passwordMatch = plainTextPassword === response.data.user.password;

        if (passwordMatch === false) {
          console.error("Invalid password.");
          setErrors({ password: "Invalid password." });
          setLoading(false);
          return;
        }
        setLoading(false);

        login(response.data.user);
        console.log(response.data);
      } catch (error) {
        console.error("Error logging in user:", error.response.data.error);
        setErrors({
          email: error.response.data.error,
          password: error.response.data.error,
        });
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      console.log("Invalid form");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(formData);
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  useEffect(() => {
    if (errors.password) {
      notify(<Typography>{errors.password}</Typography>, "error");
    }
    if (errors.email) {
      notify(<Typography>{errors.email}</Typography>, "error");
    }

  }, [errors]);

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
        </FormControl>
        <CustomButton
          type="submit"
          disabled={!formData.email || !formData.password || loading}
          text={loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              href="/register"
              color="primary"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: "16px",
                "&:hover": {
                  color: theme.palette.background.tertiary, // Change the hover color here
                  textDecorationColor: theme.palette.background.tertiary, // Change the underline color here
                },
              }}
            >
              Not Signed Up with Us? Register Now
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ display: { xs: "none", md: "inherit" }, mt: 5 }} />
      </Box>
    </div>
  );
}
