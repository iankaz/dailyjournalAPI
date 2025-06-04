import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = () => {
      // Get token from URL
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Redirect to home page
        navigate('/');
      } else {
        // Handle error case
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="auth-callback">
      <h2>Processing authentication...</h2>
      <p>Please wait while we complete your login.</p>
    </div>
  );
};

export default AuthCallback; 