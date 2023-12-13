/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import '../styles/EditProfile.css'; // Import the CSS file

const EditProfile = ({ userProfile, onUpdateProfile, onCancel }) => {
  const [editedProfile, setEditedProfile] = useState({
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    bio: userProfile.bio || '',
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setEditedProfile({
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      bio: userProfile.bio || '',
    });
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleCancel = () => {
    // Call onCancel to close the EditProfile page without saving changes
    onCancel();
  };

  const handleSaveChanges = () => {
    // Show a confirmation prompt before saving changes
    const confirmSave = window.confirm("Are you sure you want to save changes?");

    if (confirmSave) {
      // Create a FormData object to send the image file and profile data
      const formData = new FormData();
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      formData.append('firstName', editedProfile.firstName);
      formData.append('lastName', editedProfile.lastName);
      formData.append('bio', editedProfile.bio);

      // Call the onUpdateProfile function with the FormData
      onUpdateProfile(formData);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={editedProfile.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={editedProfile.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            value={editedProfile.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
