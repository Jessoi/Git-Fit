import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import ShakeBox from "../assets/shakeComponent";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { StyledTextField } from '../styles.jsx'

const EditProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false); // State to control shaking animation
  const [showDialog, setShowDialog] = useState(false); // State to show success dialog

  const { token, baseUrl } = useAuthContext();
  const navigate = useNavigate();

  const showSuccessDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      navigate("/trainee");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      height: height,
      weight: weight,
    };

    const editProfileUrl = `${baseUrl}/api/users/edit-profile`;
    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(editProfileUrl, fetchConfig);

      if (response.status === 200) {
        // Profile changed successfully
        setFirstName("");
        setLastName("");
        setHeight("");
        setWeight("");
        setIsShaking(false);
        setError(null);
        showSuccessDialog();
      } else if (response.status === 422) {
        // Validation error
        const responseData = await response.json();
        setError(responseData.detail[0].msg);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 2000);
      } else {
        // Handle other error responses
        setError("Error editing profile. Please try again.");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 2000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        "An error occurred while making the request. Please try again later."
      );
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 2000);
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
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        label="First Name"
        type="text"
        fullWidth
        margin="normal"
      />

      <StyledTextField
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        label="Last Name"
        type="text"
        fullWidth
        margin="normal"
      />

      <StyledTextField
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        label="Height"
        type="text"
        fullWidth
        margin="normal"
      />

      <StyledTextField
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        label="Weight"
        type="text"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Save Changes
      </Button>

      {error && (
        <div className="mt-2">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {showDialog && (
        <div className="mt-2">
          <Alert severity="success">
            Edited profile successful! Redirecting...
          </Alert>
        </div>
      )}
    </ShakeBox>
  );
};

export default EditProfileForm;
