import { useState } from 'react';
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

 const handleGoogleAuth = async () => {
    try {
      const googleAuthUrl = 'https://eduxcel-backend.onrender.com/auth/google';
      const popup = window.open(googleAuthUrl, '_blank', 'width=600,height=600');

      window.addEventListener('message', async (event) => {
        if (event.origin === 'https://eduxcel-backend.onrender.com' && event.data.token) {
          const token = event.data.token;
          localStorage.setItem('token', token);

          // Redirect to the profile page with the token
          navigate('/profile');
          popup.close();
        }
      });
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://eduxcel-backend.onrender.com/api/signin', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (error) {
      console.error('Signin error:', error.response.data.message);
      setSigninError(error.response.data.message);
    }
  };

    const userProfileData = profileResponse.data;
    // Set the user profile data in your state here

    navigate('/profile');
  } catch (error) {
    console.error('Signin error:', error.response.data.message);
    setSigninError(error.response.data.message);
  }
};

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
      <button type="button" onClick={handleGoogleAuth} className="google-auth-button">
        Sign In with Google
      </button>
    </div>
  );
}

export default Signin;
