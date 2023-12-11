import React, { useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";


const viteUrl = import.meta.env.VITE_PUBLIC_URL;

const ProtectedRoute = () => {
  const { token } = useToken();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const loadingUrl = `${viteUrl}/src//assets/loading.gif`;
  useEffect(() => {
    if (token) {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <img src={loadingUrl} alt="Loading" />
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/trainee/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
