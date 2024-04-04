import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes/theme";

import App from "./routes/App.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";

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
            ]
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/home", element: <Home /> },
          // { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
