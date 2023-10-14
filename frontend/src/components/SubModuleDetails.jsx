import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/SubModuleDetails.css'; // Import the CSS file for styling

function SubModuleDetails() {
  const { title, module, submodule } = useParams();
  const [subModuleDetails, setSubModuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubModuleDetails() {
      try {
        const response = await axios.get(
          `https://edu-backend-py90.onrender.com/api/courses/${encodeURIComponent(title)}/modules/${encodeURIComponent(module)}/${encodeURIComponent(submodule)}`
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
    return <div className="sub-module-container loading">Loading...</div>;
  }

  if (error) {
    return <div className="sub-module-container error">Error: {error}</div>;
  }

  if (!subModuleDetails) {
    return <div className="sub-module-container not-found">Sub-module not found.</div>;
  }

  const renderDescriptionItem = (item, index) => {
    if (Array.isArray(item)) {
      return (
        <div key={index}>
          {item.map((subItem, subIndex) => {
            if (subItem.startsWith('http')) {
              if (subItem.endsWith('.mp4')) {
                return (
                  <div key={subIndex} className="sub-video-container">
                    <video controls className="sub-module-media">
                      <source src={subItem} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              } else if (subItem.endsWith('.jpg')) {
                return (
                  <div key={subIndex} className="sub-image-container">
                    <img src={subItem} alt="Image" className="sub-module-image" />
                  </div>
                );
              }
            }

            return <p key={subIndex}>{subItem}</p>;
          })}
        </div>
      );
    }

    return <p key={index}>{item}</p>;
  };

  return (
    <div className="sub-module-container">
      <div className="sub-module-details">
        <h2 className="sub-module-title">Sub-Module: {subModuleDetails.title}</h2>
        <p className="sub-module-description">{subModuleDetails.content.introduction}</p>

        <div className="sub-module-content">
          {subModuleDetails.content.sections.map((section, index) => (
            <div className="sub-module-section" key={index}>
              <h3 className="sub-section-title">{section.title}</h3>
              <div className="sub-section-description">
                {renderDescriptionItem(section.description, index)}
              </div>
              <ul className="sub-element-list">
                {section.elements.map((element, idx) => (
                  <li className="sub-element-item" key={idx}>
                    <span className="sub-element-tag">{element.tag}</span>
                    <span className="sub-element-description">
                      {renderDescriptionItem(element.description, idx)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubModuleDetails;
