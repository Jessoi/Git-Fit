import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { TextField, Button, Alert } from "@mui/material";
import ShakeBox from "../assets/shakeComponent";
import { StyledTextField } from '../styles.jsx'

const getToken = async (baseUrl, username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const loginUrl = `${baseUrl}/token`;
    const fetchConfig = {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    };

    const response = await fetch(loginUrl, fetchConfig);
    const data = await response.json();
    return data?.access_token ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

 const showSuccessDialog = () => {
   setShowDialog(true);
   setTimeout(() => {
     setShowDialog(false);
     navigate("/trainee");
   }, 3000); // 3000 milliseconds = 3 seconds
 };

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldShake, setShouldShake] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { token, setToken, baseUrl } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newToken = await getToken(baseUrl, username, password);
      if (newToken) {
        setToken(newToken);
        setErrorMessage("");
        setSuccessMessage("Login successful. Redirecting...");
      } else {
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 2000);
        throw new Error("Failed to get token after login.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      // Redirect to /trainee after 2 seconds
      setTimeout(() => {
        navigate("/trainee");
      }, 2000);
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  }, [token, navigate]);

  return (
    <ShakeBox
      data-shouldshake={shouldShake ? "true" : "false"}
      sx={{
        width: 400,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <StyledTextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        type="text"
        fullWidth
        margin="normal"
      />

      <StyledTextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button style={{ backgroundColor: 'orange', color: 'white' }} variant="contained" onClick={handleSubmit} fullWidth>
        Sign In
      </Button>

      {errorMessage && (
        <div className="mt-2">
          <Alert severity="error">{errorMessage}</Alert>
        </div>
      )}

      {successMessage && (
        <div className="mt-2">
          <Alert severity="success">{successMessage}</Alert>
        </div>
      )}

      <div className="mt-2">
        Don't have an account? Please <a href="/trainee/signup">sign up</a>.
      </div>
    </ShakeBox>
  );
};

export default LoginForm;
