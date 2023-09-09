import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../styles/ModuleDetails.css'; // Import the CSS file for styling

function ModuleDetails() {
  const { title, module } = useParams();
  const [moduleDetails, setModuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModuleDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${encodeURIComponent(title)}/modules/${encodeURIComponent(module)}`
        );

       
        setModuleDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module details:', error);
        setError('Error fetching module details. Please try again later.');
        setLoading(false);
      }
    }

    fetchModuleDetails();
  }, [title, module]);

  if (loading) {
    return <div className="module-container loading">Loading...</div>;
  }

  if (error) {
    return <div className="module-container error">Error: {error}</div>;
  }

  if (!moduleDetails) {
    return <div className="module-container not-found">Module not found.</div>;
  }

  return (
    <div className="module-container">
      <div className="module-details">
        <h2>Module Details</h2>
        <p>Title: {moduleDetails.title}</p>
        <div className="module-content">
          {moduleDetails.content.map((item, index) => (
            <div key={index} className="module-item">
              <h3>
                <Link to={`/courses/${encodeURIComponent(title)}/${encodeURIComponent(module)}/submodules/${encodeURIComponent(item.title)}`}>
                  {item.title}
                </Link>
              </h3>
              <p>Description: {item.description}</p>
              <div className="video-container">
                <div className="video-wrapper"> {/* Add this div wrapper */}
                  <ReactPlayer url={item.videoURL} controls className="react-player" /> {/* Add 'react-player' class */}
                </div>
              </div>
              <img src={item.imageURL} alt={item.title} className="module-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
 
  
  
  
}

export default ModuleDetails;
