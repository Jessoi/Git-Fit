import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const EditProfileForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const { token } = useToken();
    const { baseUrl } = useAuthContext();

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
                "Authorization": `Bearer ${token}`
            },
        };

        try {
            const response = await fetch(editProfileUrl, fetchConfig);

            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (response.status === 200) {
                // Profile changed successfully
                setSubmitted(true);
                navigate('/trainee');
            } else if (response.status === 422) {
                // Validation error
                setError(responseData.detail[0].msg);
            } else {
                // Handle other error responses
                setError("Error editing profile. Please try again.");
            }
            } catch (error) {
                console.error("Fetch error:", error);
                setError("An error occurred while making the request. Please try again later.");
            }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className={`shadow p-4 mt-4 ${error ? 'shake' : ''}`}>
                    <h1 className="text-center">User Edit Profile</h1>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control"
                            />
                            <label htmlFor="firstName"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="form-control"
                            />
                            <label htmlFor="lastName"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Height"
                                type="text"
                                name="height"
                                id="height"
                                className="form-control"
                            />
                            <label htmlFor="height"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Weight"
                                type="text"
                                name="weight"
                                id="weight"
                                className="form-control"
                            />
                            <label htmlFor="weight"></label>
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-primary">Save Changes</button>
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

export default EditProfileForm;
