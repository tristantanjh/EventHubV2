import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import React from "react";
import NavBar from "../components/NavBar";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    console.log("Unauthorised");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}