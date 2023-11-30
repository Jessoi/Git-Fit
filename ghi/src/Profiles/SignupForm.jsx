import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const { setToken, baseUrl } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the password and confirmPassword match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
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
                setSubmitted(true);
                const responseData = await response.json();
                if (responseData?.access_token) {
                    setToken(responseData.access_token);
                    navigate('/trainee');
                } else {
                    throw new Error('Failed to get token after signing up.');
                }
                navigate('/trainee');
            } else if (response.status === 409) {
                // User already exists
                const data = await response.json();
                setError(data.detail);
            } else {
                // Handle other error responses
                setError("User with these credentials already exists.");
            }
        } catch (error) {
            // Handle any other errors
            console.error("Error:", error);
            setError("User with these credentials already exists.");
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className={`shadow p-4 mt-4 ${error ? 'shake' : ''}`}>
                    <h1 className="text-center">User Signup</h1>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                            />
                            <label htmlFor="Email"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                            />
                            <label htmlFor="username"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                            />
                            <label htmlFor="password"></label>
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
                            <button className="btn btn-primary">Sign up</button>
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

export default SignupForm;
