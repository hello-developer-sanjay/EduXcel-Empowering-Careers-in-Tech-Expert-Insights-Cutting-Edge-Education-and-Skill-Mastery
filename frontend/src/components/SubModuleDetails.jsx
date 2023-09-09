import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../styles/ModuleDetails.css'; // Import the CSS file for styling

function SubModuleDetails() {
  const { title, module, submodule } = useParams();
  const [subModuleDetails, setSubModuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubModuleDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${encodeURIComponent(title)}/modules/${encodeURIComponent(module)}/${encodeURIComponent(submodule)}`
        );

        
        setSubModuleDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sub-module details:', error);
        setError('Error fetching sub-module details. Please try again later.');
        setLoading(false);
      }
    }

    fetchSubModuleDetails();
  }, [title, module, submodule]);

  if (loading) {
    return <div className="module-container loading">Loading...</div>;
  }

  if (error) {
    return <div className="module-container error">Error: {error}</div>;
  }

  if (!subModuleDetails) {
    return <div className="module-container not-found">Sub-module not found.</div>;
  }

  return (
    <div className="module-container">
      <div className="module-details">
        <h2>Sub-Module Details</h2>
        <p>Title: {subModuleDetails.title}</p>
        <p>Description: {subModuleDetails.description}</p>
        <div className="video-container">
          <div className="video-wrapper">
            <ReactPlayer url={subModuleDetails.videoURL} controls className="react-player" />
          </div>
        </div>
        <p>Content: {subModuleDetails.content}</p>
        <img src={subModuleDetails.imageURL} alt={subModuleDetails.title} className="module-image" />
      </div>
    </div>
  );
}

export default SubModuleDetails;
