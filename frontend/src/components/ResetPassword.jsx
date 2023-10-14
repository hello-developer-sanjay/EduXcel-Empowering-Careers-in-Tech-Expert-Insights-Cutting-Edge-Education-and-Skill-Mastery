// ResetPassword.jsx
import React, { useState } from 'react';
import '../styles/ResetPassword.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server with the newPassword and token
      const response = await fetch('https://edu-backend-py90.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, token }),
      });

      if (response.status === 200) {
        setMessage('Password reset successfully');
      } else {
        setMessage('Error resetting password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {message && <p className={`message ${message === 'Password reset successfully' ? 'success' : 'error'}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password-button"
            onClick={handleTogglePassword}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Token from Email"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
