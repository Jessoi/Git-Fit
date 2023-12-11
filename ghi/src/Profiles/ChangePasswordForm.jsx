import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { TextField, Button, Alert } from "@mui/material";
import ShakeBox from "../assets/shakeComponent";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useToken();
  const { baseUrl } = useAuthContext();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [shouldshake, setShouldShake] = useState(false); // Add this state

  useEffect(() => {
    if (error) {
      // If there's an error, trigger the shake animation for 2 seconds
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 2000);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the password and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      current_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    const changePasswordUrl = `${baseUrl}/api/users/change-password`;
    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(changePasswordUrl, fetchConfig);

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.status === 200) {
        // Password changed successfully
        setSubmitted(true);
      } else if (response.status === 422) {
        // Validation error
        setError(responseData.detail[0].msg);
      } else {
        // Handle other error responses
        setError("Error changing password. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        "An error occurred while making the request. Please try again later."
      );
    }
  };

  return (
    <ShakeBox
      shouldShake={shouldshake}
      sx={{
        width: 400,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TextField
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        label="Old Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <TextField
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <TextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Change Password
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
      {submitted && (
        <Alert severity="success">Password Changed Successfully!</Alert>
      )}
    </ShakeBox>
  );
};

export default ChangePasswordForm;
