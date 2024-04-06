import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import React from "react";
import NavBar from "../components/NavBar";
import theme from "../themes/theme";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    console.log("Unauthorised");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
