import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/auth/github`;
  };

  return (
    <div className="login-container">
      <h2>Welcome to Daily Journal</h2>
      <div className="login-buttons">
        <button onClick={handleGithubLogin} className="github-btn">
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login; 