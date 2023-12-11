import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import ShakeBox from "../assets/shakeComponent";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { StyledTextField } from '../styles.jsx'

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // State to control shaking animation

  const { setToken, baseUrl } = useAuthContext();
  const navigate = useNavigate();

  // Function to show the success dialog and automatically close it after 3 seconds
  const showSuccessDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      navigate("/trainee");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsShaking(true); // Start shaking animation
      setTimeout(() => setIsShaking(false), 2000); // Stop shaking after 2 seconds
      return;
    }

    const data = { email, username, password };

    const signupUrl = `${baseUrl}/api/users`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const response = await fetch(signupUrl, fetchConfig);

      if (response.status === 200) {
        // User created successfully
        const responseData = await response.json();
        if (responseData?.access_token) {
          setToken(responseData.access_token);
          showSuccessDialog(); // Show success dialog
        } else {
          throw new Error("Failed to get token after signing up.");
        }
      } else if (response.status === 409) {
        // User already exists
        const data = await response.json();
        setError(data.detail);
        setIsShaking(true); // Start shaking animation
        setTimeout(() => setIsShaking(false), 2000); // Stop shaking after 2 seconds
      } else {
        // Handle other error responses
        setError("User with these credentials already exists.");
        setIsShaking(true); // Start shaking animation
        setTimeout(() => setIsShaking(false), 2000); // Stop shaking after 2 seconds
      }
    } catch (error) {
      // Handle any other errors
      console.error("Error:", error);
      setError("User with these credentials already exists.");
      setIsShaking(true); // Start shaking animation
      setTimeout(() => setIsShaking(false), 2000); // Stop shaking after 2 seconds
    }
  };

  return (
    <ShakeBox
      data-shouldshake={isShaking ? "true" : "false"} // Apply shaking animation
      sx={{
        width: 400,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <StyledTextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="text"
        fullWidth
        margin="normal"
      />

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

      <StyledTextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white' }} onClick={handleSubmit} fullWidth>
        Sign Up
      </Button>

      {error && (
        <div className="mt-2">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {showDialog && (
        <div className="mt-2">
          <Alert severity="success">Signup successful! Redirecting...</Alert>
        </div>
      )}
    </ShakeBox>
  );
};

export default SignupForm;
