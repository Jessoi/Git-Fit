import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import Alert from '@mui/material/Alert'; // Import Alert from MUI

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

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { token, setToken, baseUrl } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newToken = await getToken(baseUrl, username, password);
      if (newToken) {
        setToken(newToken);
        setErrorMessage('');
      } else {
        throw new Error('Failed to get token after login.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/trainee');
      setErrorMessage('');
    }
  }, [token, navigate]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className={`shadow p-4 mt-4 ${errorMessage ? 'shake' : ''}`}>
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
          {errorMessage && (
            <div className="mt-2">
              <Alert severity="error">{errorMessage}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
