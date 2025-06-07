// components/AuthRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If already logged in, redirect to home
  if (token) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default AuthRoute;
