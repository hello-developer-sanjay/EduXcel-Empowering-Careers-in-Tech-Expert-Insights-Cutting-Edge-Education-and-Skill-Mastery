import  React,{ useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const CourseContainer = styled.div`
  padding: 2rem;
  background-color: #050816; 
  min-height: 100vh;
`;

const CourseNavigation = styled.nav`
  margin-bottom: 2rem;
`;

const CourseNavList = styled.ul`
  list-style: none;
  display: flex;
  color : #fff;
  flex-wrap: wrap;
  gap: 1rem;
`;


const CourseTitle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color : #fff;
`;


const CourseNavItem = styled.li`
flex: 1;
padding: 0.5rem;
text-align: center;
border-radius: 5px;
transition: transform 0.2s, background-color 0.2s;


  color: #ffffff; 
}

  
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
    color: red; /* Text color for the active link */
  }
`;





const CourseContent = styled.div`
background-color: #050816; 
padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CourseItem = styled.li`
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
 font-size: 1rem; /* Small font size */
  line-height: 1;
  margin-top: 1rem;
  position: relative;
  color: #fff; /* Default text color */

  span.highlight {
    color: #0070f3; /* Highlighted text color */
    font-weight: bold; /* Highlighted text bold */
  }


  &:before {
    content: ' Course Description '; /* Use decorative stars as labels */
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
    color: #0070f3; /* Change the label color */
    font-size: 1rem; /* Adjust label font size */
    letter-spacing: 1px; /* Add letter spacing for emphasis */
    text-align: left;
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
  const [courses, setProjects] = useState([]);

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
    <CourseContainer>
      <Helmet>
      <title>Eduxcel | Comprehensive Tech Course Portfolio: Web Development, Machine Learning, Artificial Intelligence, and More</title>
      <meta name="description" content="Explore Eduxcel's comprehensive course offerings in web development, machine learning, artificial intelligence, and more. Our courses cover a wide range of topics, including programming languages, version control, databases, problem-solving, communication skills, web accessibility, performance optimization, security principles, and continuous learning. Whether you're a beginner looking to start a career in tech or a seasoned professional seeking to enhance your skills, Eduxcel provides expert-led courses designed to help you succeed in today's fast-paced digital landscape. Join us and take your skills to the next level with our innovative and engaging online learning platform."/>
  <meta name="keywords" content="Sanjay Patidar, projects,courses, careers, tech,  web development, mobile app development, innovative projects, technology, programming, coding, software development" />
  <meta name="author" content="Sanjay Patidar" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Eduxcel | Comprehensive Tech Course Portfolio: Web Development, Machine Learning, Artificial Intelligence, and More" />
  <meta property="og:description" content="Explore Eduxcel's comprehensive course offerings in web development, machine learning, artificial intelligence, and more. Our courses cover a wide range of topics, including programming languages, version control, databases, problem-solving, communication skills, web accessibility, performance optimization, security principles, and continuous learning. Whether you're a beginner looking to start a career in tech or a seasoned professional seeking to enhance your skills, Eduxcel provides expert-led courses designed to help you succeed in today's fast-paced digital landscape. Join us and take your skills to the next level with our innovative and engaging online learning platform." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/skillsImage.png" />
  <meta property="og:image:alt" content="Eduxcel | Comprehensive Tech Course Portfolio: Web Development, Machine Learning, Artificial Intelligence, and More" />
  <meta property="og:site_name" content="Eduxcel | Comprehensive Tech Course Portfolio: Web Development, Machine Learning, Artificial Intelligence, and More" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Eduxcel | Comprehensive Tech Course Portfolio: Web Development, Machine Learning, Artificial Intelligence, and More" />
  <meta name="twitter:description" content="Explore Eduxcel's comprehensive course offerings in web development, machine learning, artificial intelligence, and more. Our courses cover a wide range of topics, including programming languages, version control, databases, problem-solving, communication skills, web accessibility, performance optimization, security principles, and continuous learning. Whether you're a beginner looking to start a career in tech or a seasoned professional seeking to enhance your skills, Eduxcel provides expert-led courses designed to help you succeed in today's fast-paced digital landscape. Join us and take your skills to the next level with our innovative and engaging online learning platform." />
  <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/skillsImage.png" />

</Helmet>

     <CourseNavigation>
        <CourseNavList>
          
          <CourseNavItem>
            <CourseNavLinkContainer to="/course/html_courses">
  HTML            </CourseNavLinkContainer>
          </CourseNavItem>
          <CourseNavItem>
            <CourseNavLinkContainer to="/course/css_courses">
            CSS (Cascading Style Sheets)
            </CourseNavLinkContainer>
          </CourseNavItem>


          <CourseNavItem>

            <CourseNavLinkContainer to="/course/javascript_courses">
            JavaScript
                        </CourseNavLinkContainer>
          </CourseNavItem>

          <CourseNavItem>

<CourseNavLinkContainer to="/course/responsive_web_design_courses">
Responsive Web Design
            </CourseNavLinkContainer>
</CourseNavItem>



<CourseNavItem>

<CourseNavLinkContainer to="/course/css_preprocessors_courses">
CSS Preprocessors

            </CourseNavLinkContainer>
</CourseNavItem>



<CourseNavItem>

<CourseNavLinkContainer to="/course/dom_manipulation_courses">
DOM Manipulation
            </CourseNavLinkContainer>
</CourseNavItem>
        </CourseNavList>
      </CourseNavigation>
      <CourseContent>
        {courses.length > 0 ? (
          <CourseList>
            {courses.map((course) => {
              return (
                <CourseItem key={category}>
                  <NavLink to={`/${category}`} style={{ textDecoration: 'none' }}>
                    <CourseTitle>{course.title}</CourseTitle>
                  </NavLink>
                
                                 {course.overview && (
                  <CourseDescription>
                    {course.overview.map((desc, index) => {
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
                  </CourseDescription>
)}
                </CourseItem>
              );
            })}
          </CourseList>
        ) : (
          <p>No Course found.</p>
        )}
      </CourseContent>

    
    </CourseContainer>
  );
};

export default Course;
