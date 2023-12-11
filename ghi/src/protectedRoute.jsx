import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

/**
 * A component to protect private routes. It checks if the user is authenticated by
 * checking for a valid token. If the user is not authenticated, they will be redirected
 * to the login page.
 */
const ProtectedRoute = () => {
  const { token } = useToken(); // useToken provides the token and authentication status
  const location = useLocation();
  // If there is no token, it means the user is not authenticated
  if (!token) {
    // Redirect to the login page and pass the current location in state
    return <Navigate to="/trainee/login" state={{ from: location }} replace />;
  }

  // If a token is present, render the children components which are the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
