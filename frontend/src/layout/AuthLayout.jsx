import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthProvider";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AuthProvider>
        <ToastContainer />
        <Outlet />
      </AuthProvider>
    </Suspense>
  );
}
