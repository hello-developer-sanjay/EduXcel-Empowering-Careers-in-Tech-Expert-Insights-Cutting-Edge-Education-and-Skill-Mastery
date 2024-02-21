  import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    latitude: null,
    longitude: null,
  });
  const [userProfile, setUserProfile] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setFormData((prevData) => ({
          ...prevData,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error('Error getting location:', error.message);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

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
    setLoading(true);

    try {
      const response = await axios.post('https://edu-back-j3mz.onrender.com/api/signin', formData);
      console.log('Signin success');
      const token = response.data.token;

      localStorage.setItem('token', token);

      const profileResponse = await axios.get('https://edu-back-j3mz.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userProfileData = profileResponse.data;
      setUserProfile(userProfileData);
      navigate('/profile');
    } catch (error) {
      console.error('Signin error:', error.response.data.message);
      setSigninError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

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
          {loading ? (
            <RingLoader color={'#ffffff'} loading={loading} css={override} size={30} />
          ) : (
            'Sign In'
          )}
        </button>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password❓ Click to reset 
        </Link>
      </form>
      {signinError && <p className="error-message">{signinError}</p>}
    </div>
  );
}

export default Signin;
