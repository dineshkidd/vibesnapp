import React from "react";
import {useAuthStore} from "./stores/authStore";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "./pages/LoadingPage";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  console.log("rerendered");

  if (loading) return <LoadingPage/>; // Show loading spinner while checking auth state
  if (!user || !user.emailVerified) return <Navigate to="/login" />; // Redirect to login if not authenticated
  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
