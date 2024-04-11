import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import React from "react";
import NavBar from "../components/NavBar";
import theme from "../themes/theme";
import { SearchProvider } from "../hooks/SearchProvider";
import { notify } from "../utils/utils";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    console.log("Unauthorised");
    notify("Please login first!", "error");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SearchProvider>
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
      </SearchProvider>
    </>
  );
}
