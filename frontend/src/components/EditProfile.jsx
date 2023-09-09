/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import '../styles/EditProfile.css'; // Import the CSS file

const EditProfile = ({ userProfile, onUpdateProfile }) => {
  const [editedProfile, setEditedProfile] = useState({
    // eslint-disable-next-line react/prop-types
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
