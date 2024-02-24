import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import ModalImage from 'react-modal-image';
 import React from 'react';
const ProjectDetailsContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-color: #CBD1C3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectDetailsTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  color: #ff6b6b;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Pacifico', cursive;
  background-image: linear-gradient(45deg, #ff6b6b, #ffc6c6); /* Gradient background */
  background-clip: text; /* Clip text to background */
  -webkit-background-clip: text; /* For Safari */
  color: transparent; /* Hide the original text color */
  animation: rainbow 3s linear infinite; /* Rainbow animation */

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


const ProjectDetailsDescription = styled.p`
  font-size: 1rem; /* Small font size */
  line-height: 1.6;
  margin-top: 1rem;
  position: relative;
  color: #333; /* Default text color */

  span.highlight {
    color: #0070f3; /* Highlighted text color */
    font-weight: bold; /* Highlighted text bold */
  }


  &:before {
    content: '✨ Project Description ✨'; /* Use decorative stars as labels */
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #0070f3; /* Change the label color */
    font-size: 1.2rem; /* Adjust label font size */
    letter-spacing: 2px; /* Add letter spacing for emphasis */
    text-align: center;
    text-transform: uppercase; /* Uppercase text for emphasis */
  }

  &:after {
    content: '';
    display: block;
    margin-top: 0.5rem;
    height: 2px;
    background: linear-gradient(
      to right,
      #0070f3,
      #ff6b6b,
      #33d9b2,
      #ffad5a
    ); 
    background-size: 300% 100%; /* Control the gradient width */
    animation: gradient-shift 5s linear infinite; /* Animation for gradient shift */
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;

const ProjectDetailsImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  justify-content: center;
`;

const ProjectDetailsImage = styled(ModalImage)`
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProjectDetailsVideoContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

const ProjectDetailsLinkContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
  width:100%;
 
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #f38181, #fce38a); /* Reverse gradient */
    clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%);
    z-index: -1;
  }
`;





const AdditionalDetailsContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust the max width as needed */
  margin: 0 auto;
`;

const AdditionalDetailsItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.4;
  color: #0070f3; /* Change text color to a creative blue */
  font-weight: bold; /* Add bold font weight */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Change font-family */
`;

const CourseDetailed = () => {
  const { id } = useParams();
  const [course, setProject] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await axios.get(`https://edu-back-j3mz.onrender.com/api/courses/details/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }

    fetchProjectDetails();
  }, [id]);

  const isURL = (str) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(str);
  };

  return (
    <ProjectDetailsContainer>
      {course ? (
        <>
          <ProjectDetailsTitle>{course.title}</ProjectDetailsTitle>
          {course.links && (
           <ProjectDetailsLinkContainer>
          
          
            </ProjectDetailsLinkContainer>
          )}
         {course.description && (
                  <ProjectDetailsDescription>
                    {course.description.map((desc, index) => {
                      // Use regular expressions to find text between ^ markers and apply styling
                      const highlightedText = desc.split(/\^([^]+?)\^/).map((part, i) => {
                        if (i % 2 === 1) {
                          // Apply styles to text between markers
                          return <span key={i} className="highlight">{part}</span>;
                        }
                        return part;
                      });

                      return (
                        <React.Fragment key={index}>
                          {highlightedText}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </ProjectDetailsDescription>
          )}
        
        
          {course.additionalDetails && (
            <AdditionalDetailsContainer>
              <h3>Additional Details:</h3>
              {course.additionalDetails.map((detail, index) => (
                <AdditionalDetailsItem key={index}>
                  {isURL(detail) ? (
                    detail.endsWith('.mp4') ? (
                      <ProjectDetailsVideoContainer>
                        <ReactPlayer
                          url={detail}
                          width="100%"
                          height="100%"
                          controls
                        />
                      </ProjectDetailsVideoContainer>
                    ) : (
                      <ProjectDetailsImageGrid>
                        <ProjectDetailsImage
                          small={detail}
                          large={detail}
                          alt={`Additional Image ${index}`}
                        />
                      </ProjectDetailsImageGrid>
                    )
                  ) : (
                    detail
                  )}
                </AdditionalDetailsItem>
              ))}
            </AdditionalDetailsContainer>
          )}

          
      

        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </ProjectDetailsContainer>
  );
};

export default CourseDetailed;
