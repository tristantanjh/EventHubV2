import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./themes/theme";

import App from "./routes/App.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import ManageEvents from "./routes/ManageEvents.jsx";
import EventHistory from "./routes/EventHistory.jsx";
import CreateEvent from "./routes/CreateEvent.jsx";

import AuthLayout from "./layout/AuthLayout.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import LoginRegisterLayout from "./layout/LoginRegisterLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <App /> },
          {
            element: <LoginRegisterLayout />,
            children: [
              { path: "/login", element: <Login /> },
              { path: "/register", element: <Register /> },
            ],
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/create-event", element: <CreateEvent /> },
          { path: "/profile", element: <Profile /> },
          { path: "/manage-events", element: <ManageEvents /> },
          { path: "/event-history", element: <EventHistory /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
