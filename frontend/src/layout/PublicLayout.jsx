import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import React from "react";

export default function PublicLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
