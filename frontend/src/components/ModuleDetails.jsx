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
          `https://edu-backend-py90.onrender.com/api/courses/${encodeURIComponent(title)}/modules/${encodeURIComponent(module)}`
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
              <p className="module-description">Description: {item.details}</p>  {/* Display additional details */}
              {item.elements && (
                <div>
                  <h4>HTML Elements:</h4>
                  <ul>
                    {item.elements.map((element, elementIndex) => (
                      <li key={elementIndex}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.styling_options && (
                <div>
                  <h4>CSS Styling Options:</h4>
                  <ul>
                    {item.styling_options.map((option, optionIndex) => (
                      <li key={optionIndex}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.javascript_features && (
                <div>
                  <h4>JavaScript Features:</h4>
                  <ul>
                    {item.javascript_features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.responsive_techniques && (
                <div>
                  <h4>Responsive Techniques:</h4>
                  <ul>
                    {item.responsive_techniques.map((technique, techniqueIndex) => (
                      <li key={techniqueIndex}>{technique}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.frontend_frameworks && (
                <div>
                  <h4>Frontend Frameworks:</h4>
                  <ul>
                    {item.frontend_frameworks.map((framework, frameworkIndex) => (
                      <li key={frameworkIndex}>{framework}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.topics && (
                <div>
                  <h4>Topics:</h4>
                  <ul>
                    {item.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.ml_types && (
                <div>
                  <h4>Machine Learning Types:</h4>
                  <ul>
                    {item.ml_types.map((mlType, mlTypeIndex) => (
                      <li key={mlTypeIndex}>{mlType}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.ml_algorithms && (
                <div>
                  <h4>Machine Learning Algorithms:</h4>
                  <ul>
                    {item.ml_algorithms.map((mlAlgorithm, mlAlgorithmIndex) => (
                      <li key={mlAlgorithmIndex}>{mlAlgorithm}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.feature_engineering && (
                <div>
                  <h4>Feature Engineering:</h4>
                  <ul>
                    {item.feature_engineering.map((featureEng, featureEngIndex) => (
                      <li key={featureEngIndex}>{featureEng}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="video-container">
                <div className="video-wrapper">
                  <ReactPlayer url={item.videoURL} controls className="react-player" />
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
