import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signupError, setSignupError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!validator.isEmail(formData.email)) {
      setSignupError('Invalid email format');
      return;
    }

    const response = await axios.post('https://edu-backend-py90.onrender.com/api/signup', formData);
    console.log('Signup success');
    setSignupSuccess('Signup successful!');
  } catch (error) {
    console.error('Signup error:', error.response.data.message);
    setSignupError(error.response.message);
  }
};

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          Signup
        </button>
        {signupError && <p className="error-message">{signupError}</p>}
        {signupSuccess && <p className="success-message">{signupSuccess}</p>} {/* Render signup success message */}
      </form>
    </div>
  );
}

export default Signup;
