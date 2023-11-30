import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import useToken from "@galvanize-inc/jwtdown-for-react";

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { change_password } = useToken();
    const [submitted, setSubmitted] = useState(false);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

        const changePasswordUrl = "http://localhost:8000/api/users/change-password/";
        const fetchConfig = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        console.log(fetchConfig);

        try {
            const response = await fetch(changePasswordUrl, fetchConfig);

            if (response.status === 200) {
                // Password changed successfully
                setSubmitted(true);
                change_password(username, password)
                navigate('/trainee');
            } else if (response.status === 422) {
                // Validation error
                const responseData = await response.json();
                setError(responseData.detail[0].msg);
            } else {
                // Handle other error responses
                setError("Error changing password. Please try again.");
            }
            } catch (error) {
            console.log(error);
            // setError("Error changing password. Please try again.");
            }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className={`shadow p-4 mt-4 ${error ? 'shake' : ''}`}>
                    <h1 className="text-center">User Change Password</h1>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Old Password"
                                required
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                className="form-control"
                            />
                            <label htmlFor="oldPassword"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                required
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="form-control"
                            />
                            <label htmlFor="newPassword"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                            />
                            <label htmlFor="confirmPassword"></label>
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-primary">Change Password</button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-2">
                            <Alert severity="error">{error}</Alert>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
