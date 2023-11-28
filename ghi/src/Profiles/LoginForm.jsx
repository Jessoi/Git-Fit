import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // Define the error state

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const loginUrl = "http://localhost:8000/token";
    const fetchConfig = {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const response = await fetch(loginUrl, fetchConfig);
      if (response.ok) {
        setSubmitted(true);
        navigate('/trainee');
      } else {
        // Handle error response (e.g., incorrect username or password)
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className={`shadow p-4 mt-4 ${error ? 'shake' : ''}`}>
          <h1 className="text-center">User Login</h1>
          <form id="login-form" onSubmit={handleSubmit}>
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
            <div className="col text-center">
              <button className="btn btn-primary">Login</button>
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

export default LoginForm;
