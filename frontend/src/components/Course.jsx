import  React,{ useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const ProjectsContainer = styled.div`
  padding: 2rem;
  background-color: #D0EAE7;
  min-height: 100vh;
`;

const ProjectsNavigation = styled.nav`
  margin-bottom: 2rem;
`;

const ProjectsNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const ProjectWebsiteLink = styled.a`
  text-decoration: none;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 1rem 1rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%);
  background-size: 100% 100%;
  transition: transform 0.3s, background 0.5s, box-shadow 0.3s;

  svg {
    margin-right: 1rem;
    fill: #ffffff;
    transition: fill 0.3s;
  }

  &:hover {
    background-position: 100% 0;
   
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    filter: hue-rotate(45deg); /* Add a vibrant color shift on hover */
  }

  &:hover svg {
    fill: #ffffff;
    transform: rotate(45deg); /* Rotate the icon on hover */
  }
`;

const ProjectTitle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #0070f3;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #ff6b6b; /* Change color on hover */
    transform: translateY(-2px); /* Add a subtle upward hover effect */
  }

  .arrow {
    display: block; /* Display the arrow as a block element */
    text-align: left;
    font-size: 1.5rem; /* Adjust the font size of the arrow */
    animation: bounce 1s infinite; /* Add the bounce animation */
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;


const ProjectsNavItem = styled.li`
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  background-color: #f0f8ff; /* Light blue background */
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    background-color: #0070f3; /* Blue background on hover */
    color: #ffffff; /* White text on hover */
  }
  
`;

const ProjectsNavLinkContainer = styled(NavLink)`
  text-decoration: none;
  color: #333;
  display: block;
  height: 100%; /* Make the link take up the full height of the container */
  position: relative;

  &:hover {
    color: #ff6b6b;
    &:before {
      content: ''; /* Add a decorative line under the link on hover */
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #ff6b6b;
    }
  }

  &.active {
    color: #ffffff;
    background: linear-gradient(to right, #0070f3, #ff6b6b, #33d9b2, #ffad5a); /* Gradient background for the active link */
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





const ProjectsContent = styled.div`
  background-color: #C9DACD;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
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
    ); /* Use a gradient background */
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




const Course = () => {
  const { category } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let response;
        if (!category || category === 'all') { // Check if category is undefined or "all"
          response = await axios.get('https://edu-back-j3mz.onrender.com/api/courses/category/all');
        } else {
          response = await axios.get(`https://edu-back-j3mz.onrender.com/api/courses/category/${category}`);
        }
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, [category]);
  return (
    <ProjectsContainer>
      <Helmet>
      <title>Eduxcel | Course Portfolio: Web Development, Mobile App Development, UI/UX Design</title>
  <meta name="description" content="Explore the diverse range of projects developed by Sanjay Patidar, showcasing expertise in web development, mobile app development, and various other categories. Discover innovative solutions, unique designs, and successful implementations." />
  <meta name="keywords" content="Sanjay Patidar, projects, web development, mobile app development, innovative projects, technology, programming, coding, software development" />
  <meta name="author" content="Sanjay Patidar" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Sanjay Patidar | Projects Portfolio: Web Development, Mobile App Development, UI/UX Design" />
  <meta property="og:description" content="Explore the diverse range of projects developed by Sanjay Patidar, showcasing expertise in web development, mobile app development, and various other categories. Discover innovative solutions, unique designs, and successful implementations." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sanjay-patidar.vercel.app/projects" />
  <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/skillsImage.png" />
  <meta property="og:image:alt" content="Sanjay Patidar | Projects Portfolio: Web Development, Mobile App Development, UI/UX Design" />
  <meta property="og:site_name" content="Sanjay Patidar | Projects Portfolio: Web Development, Mobile App Development, UI/UX Design" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sanjay Patidar | Projects Portfolio: Web Development, Mobile App Development, UI/UX Design" />
  <meta name="twitter:description" content="Explore the diverse range of projects developed by Sanjay Patidar, showcasing expertise in web development, mobile app development, and various other categories. Discover innovative solutions, unique designs, and successful implementations." />
  <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/skillsImage.png" />

</Helmet>

     <ProjectsNavigation>
        <ProjectsNavList>
          
          <ProjectsNavItem>
            <ProjectsNavLinkContainer to="/courses/frontend">
Frontend            </ProjectsNavLinkContainer>
          </ProjectsNavItem>
          <ProjectsNavItem>
            <ProjectsNavLinkContainer to="/courses/data_science">
        Data Science
            </ProjectsNavLinkContainer>
          </ProjectsNavItem>
          <ProjectsNavItem>

            <ProjectsNavLinkContainer to="/courses/machine_learning">
              Machine Learning
            </ProjectsNavLinkContainer>
          </ProjectsNavItem>
        </ProjectsNavList>
      </ProjectsNavigation>
      <ProjectsContent>
        {projects.length > 0 ? (
         <ProjectList>
            {projects.map((course) => (
              <ProjectItem key={course._id}>
                <NavLink to={`/api/courses/details/${course._id}`}
                   style={{ textDecoration: 'none' }}
                  >
                  <ProjectTitle>
                    {course.title}
                  </ProjectTitle>
                </NavLink>
                {course.websiteLink && (
                  <ProjectWebsiteLink href={course.websiteLink} target="_blank" rel="noopener noreferrer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width="18"
                      height="18"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 19a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h2a2 2 0 012 2v8z"
                      />
                    </svg>
                    Visit Website
                  </ProjectWebsiteLink>
                )}
                                       {course.description && (
                  <ProjectDescription>
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
                  </ProjectDescription>
                )}
              </ProjectItem>
            ))}
          </ProjectList>
        ) : (
          <p>No projects found.</p>
        )}
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Course;
