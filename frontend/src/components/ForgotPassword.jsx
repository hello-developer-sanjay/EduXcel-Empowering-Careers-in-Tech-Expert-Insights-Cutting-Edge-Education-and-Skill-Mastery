// ForgotPassword.jsx
import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; // Import the CSS file for styling
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://edu-backend-py90.onrender.com/api/forgotpassword', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Forgot password error:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-heading">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        {message && (
  <p className={`message ${message === 'Password reset email sent successfully' ? 'success' : 'error'}`}>
    {message}
  </p>
)}
      </div>
    </div>
  );
}

export default ForgotPassword;
