import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditProfile from './EditProfile';
import '../styles/UserProfile.css';
import CreativeSpinner from './CreativeSpinner';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin'); // Redirect the user to the login page
          return;
        }

        const response = await fetch('https://edu-backend-py90.onrender.com/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user profile: ${response.status}`);
        }

        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://edu-backend-py90.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfileData,
      });

      if (!response.ok) {
        throw new Error(`Error updating user profile: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Send a request to the server to log the user out
      await axios.post('https://edu-backend-py90.onrender.com/api/logout');
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
      {loading && (
        <motion.div
          className="loading-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <CreativeSpinner />
          <p className="loading-text">Loading...</p>
        </motion.div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
     {!loading && !error && userProfile && (
  <div className="profile-info">
    <div className="profile-image-container">
      <motion.img
        src={`https://edu-backend-py90.onrender.com/${userProfile.profileImage}?key=${Date.now()}`}
        alt="Profile"
        className="profile-image"
        whileHover={{ scale: 1.1 }}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite error loop
          e.target.src = 'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'; // Display a default image on error
        }}
      />
    </div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Bio: {userProfile.bio}</p>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      )}
      {isEditing && (
        <EditProfile
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default UserProfile;
