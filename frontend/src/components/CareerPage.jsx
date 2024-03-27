import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const CourseContainer = styled.div`
  padding: 2rem;
  background-color: #050816;
  min-height: 100vh;
  overflow: hidden; /* Hide overflow for container */
`;

const CourseNavigation = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure it's above other content */
  margin-bottom: 0rem;
  background-color: #050816;
  padding: 0.2rem 0.2rem;
  overflow-y: auto; /* Enable vertical scrolling for navigation */
  max-height: calc(100vh - 4rem); /* Limit height to viewport height minus padding */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Roundness of the scrollbar thumb */
  }
`;

const CourseNavList = styled.ul`
  list-style: none;
  display: flex;
  color: #fff;
  flex-wrap: wrap;
  gap: 1rem;
`;
const CourseTitle = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #0070f3;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: inline-block;
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background-color: #0070f3;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 2px;
    background-color: #ff6b6b;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;


const CourseNavItem = styled.li`
  flex: 1;
  padding: 0rem;
  text-align: center;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.2s;
  color: #ffffff;
`;

const CourseNavLinkContainer = styled(NavLink)`
  text-decoration: none;
  display: block;
  position: relative;
  color: #fff;

  &:hover {
    color: yellow;
  }

  &.active {
    color: red;
    /* Text color for the active link */
  }
`;

const CourseContent = styled.div`
  background-color: #050816;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; 
  max-height: calc(100vh - 4rem);
  margin-top: 0rem; 

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 10px !important; 
  }
  &::-webkit-scrollbar-track {
    background: linear-gradient(to right, #050816, #111); 
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #0070f3, #00ff95); 
    border-radius: 5px !important; 
    border: 3px solid #050816; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #ff6b6b, #ffdd59); 
    border-color: #111; 
  }
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CourseItem = styled.li`
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  line-height: 2;
  margin-top: 1rem;
  position: relative;
  color: #fff;

  span.highlight {
    color: #0070f3;
    font-weight: bold;
  }

  &:before {
    content: ' Career Overview ';
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transform: skew(-5deg);
    color: #0070f3;
    font-size: 1rem;
    letter-spacing: 1px;
    text-align: left;
    text-transform: uppercase;
  }

  &:after {
    content: '';
    display: block;
    margin-top: 0.5rem;
    height: 2px;
    background: linear-gradient(to right, #0070f3, #ff6b6b, #33d9b2, #ffad5a);
    background-size: 300% 100%;
    animation: gradient-shift 5s linear infinite;
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

const Talk = () => {
  const { vision } = useParams();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchProjects() {
      try {
        let response;
        if (!vision || vision === 'all') {
          // Check if vision is undefined or "all"
          response = await axios.get('https://portfolio-api2-zhoj.onrender.com/api/careers/vision/all');
        } else {
          response = await axios.get(`https://portfolio-api2-zhoj.onrender.com/api/careers/vision/${vision}`);
        }
        setCareers(response.data);
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error('Error fetching career options:', error);
      }
    }

    fetchProjects();
  }, [vision]);

  return (
    <CourseContainer>
      <Helmet>
      <title>{`${vision ? vision.replace(/_/g, ' ').toUpperCase() : 'Explore Careers'} | Tech Careers with EduXcel - Sanjay Patidar`}</title>
 <meta name="description" content={`Explore various tech careers like Frontend Development and Backend Development with EduXcel, where education meets innovation. Discover expert insights, career opportunities, and skill development pathways. Whether you're an experienced professional looking to advance your career or a novice enthusiast eager to delve into the world of technology, EduXcel provides a vibrant learning community that fosters curiosity, embraces challenges, and ensures growth. Join us on a journey of exploration, collaboration, and excellence.`} />
      </Helmet>
 
      <CourseNavigation>
        <CourseNavList>
          <CourseNavItem>
            <CourseNavLinkContainer to="/careers/frontend_development_careers">
              Frontend_development_career{' '}
            </CourseNavLinkContainer>
          </CourseNavItem>
          <CourseNavItem>
            <CourseNavLinkContainer to="/careers/backend_development_careers">
              Backend_development_career{' '}
            </CourseNavLinkContainer>
          </CourseNavItem>
        </CourseNavList>
      </CourseNavigation>
      <CourseContent>
        {loading ? ( // Show loading indicator when loading
          <p>Loading...</p>
        ) : careers.length > 0 ? (
          <CourseList>
            {careers.map((career, index) => {
              return (
                <CourseItem key={index}>
                  <NavLink to={`/career/${vision}`} style={{ textDecoration: 'none' }}>
                    <CourseTitle>{career.title}</CourseTitle>
                  </NavLink>
                  {career.overview && (
                    <CourseDescription>
                      {career.overview.map((desc, index) => {
                        const highlightedText = desc.split(/\^([^]+?)\^/).map((part, i) => {
                          if (i % 2 === 1) {
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
                    </CourseDescription>
                  )}
                </CourseItem>
              );
            })}
          </CourseList>
        ) : (
          <p>No Career Option found. We are adding content, please check back soon</p>
        )}
      </CourseContent>
    </CourseContainer>
  );
};

export default Talk;
