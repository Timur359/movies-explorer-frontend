import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
