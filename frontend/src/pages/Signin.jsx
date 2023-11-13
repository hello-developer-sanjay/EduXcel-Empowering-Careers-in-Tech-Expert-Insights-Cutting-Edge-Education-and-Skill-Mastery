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
const [userProfile, setUserProfile] = useState(null);
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
    const token = localStorage.getItem('token');

    if (token) {
      // Token is present, the user is already authenticated
      try {
        // Fetch the user profile data using the token
        console.log('Fetching user profile...');
        const profileResponse = await axios.get('https://eduxcel-backend.onrender.com/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProfileData = profileResponse.data;
        console.log('Received user profile data:', userProfileData);

        // Set the user profile data in your state here
        setUserProfile(userProfileData); // Set the state with fetched user profile data

        // Navigate to the profile page
        navigate('/profile');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      // Token is not present, initiate Google sign-in
      const googleAuthUrl = 'https://eduxcel-backend.onrender.com/auth/google';

      // Open a new window to initiate Google authentication
      const popup = window.open(googleAuthUrl, '_blank', 'width=600,height=600');

      // Listen for messages from the popup window
      window.addEventListener('message', async (event) => {
        console.log('Received message from popup:', event);

        if (event.origin === 'https://eduxcel-backend.onrender.com' && event.data.token) {
          // Token received from the popup window
          const newToken = event.data.token;
          console.log('Received token:', newToken);

          // Store the token in local storage
          localStorage.setItem('token', newToken);

          try {
            // Fetch the user profile data using the token
            console.log('Fetching user profile...');
            const profileResponse = await axios.get('https://eduxcel-backend.onrender.com/api/profile', {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            const userProfileData = profileResponse.data;
            console.log('Received user profile data:', userProfileData);

            // Set the user profile data in your state here
            setUserProfile(userProfileData); // Set the state with fetched user profile data

            // Close the popup window
            popup.close();

            // Navigate to the profile page
            navigate('/profile');
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
      });
    }
  } catch (error) {
    console.error('Google authentication error:', error);
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://eduxcel-backend.onrender.com/api/signin', formData);
    console.log('Signin success');
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem('token', token);

    // Fetch the user profile data here
    const profileResponse = await axios.get('https://eduxcel-backend.onrender.com/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
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
