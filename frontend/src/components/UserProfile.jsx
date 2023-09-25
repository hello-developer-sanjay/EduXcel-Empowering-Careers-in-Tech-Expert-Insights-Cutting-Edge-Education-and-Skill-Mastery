import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await axios.get('https://xcel-back.onrender.com/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error('User profile not found');
        }

        setUserProfile(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Send a request to the server to log the user out
      await axios.post('https://xcel-back.onrender.com/api/logout');
      // Clear the token from local storage
      localStorage.removeItem('token');
      // Redirect the user to the login page using navigate
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && userProfile && (
        <div className="profile-info">
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Bio: {userProfile.bio}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
