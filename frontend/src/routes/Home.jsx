import React from "react";
import CustomButtonWhiteSquare from "../components/CustomButtonWhiteSquare";
import { useAuth } from "../hooks/AuthProvider.jsx";

export default function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <p>Home content</p>
    </div>
  );
}
