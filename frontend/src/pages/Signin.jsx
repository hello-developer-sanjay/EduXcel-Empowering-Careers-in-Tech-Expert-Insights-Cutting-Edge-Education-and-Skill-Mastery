import  { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [signinError, setSigninError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
    const response = await axios.post('https://edu-backend-py90.onrender.com/api/signin', formData);
    console.log('Signin success');
    localStorage.setItem('token', response.data.token);

    // Fetch the user profile data here
    const profileResponse = await axios.get('https://edu-backend-py90.onrender.com/api/profile', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });

    const userProfileData = profileResponse.data;
    // Set the user profile data in your state here

    navigate('/profile');
  } catch (error) {
    console.error('Signin error:', error.response.data.message);
    setSigninError(error.response.data.message);
  }
};




  // Google OAuth2 URL
  const googleAuthUrl = 'https://edu-backend-py90.onrender.com/auth/google';

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
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
          Sign In
        </button>
        <Link to="/forgot-password">Forgot Password</Link>
      </form>
      {signinError && <p className="error-message">{signinError}</p>}
      
      {/* Google Authentication Button */}
      <a href={googleAuthUrl} className="google-auth-button">
        Sign In with Google
      </a>
    </div>
  );
}

export default Signin;
