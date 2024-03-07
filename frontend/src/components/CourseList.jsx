import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/CourseList.css';
import courseImage1 from '../assets/html.png';
import courseImage2 from '../assets/css.png';
import courseImage3 from '../assets/responsive1.png';
import courseImage4 from '../assets/preprocessors.png';

import SignInSignUp from './SignInSignUp';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showSignInSignUp, setShowSignInSignUp] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        let response;
        if (!category || category === 'all') {
          response = await axios.get('https://edu-back-j3mz.onrender.com/api/courses/category/all');
        } else {
          response = await axios.get(`https://edu-back-j3mz.onrender.com/api/courses/category/${category}`);
        }
        if (!response) {
          response = await axios.get('https://edu-back-j3mz.onrender.com/api/courses/category');
        }
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, [category]);

  const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));

  // Function to handle hover over course card
  const handleCourseCardHover = () => {
    // Only show the signup form if the user is not signed in
    if (!localStorage.getItem('token')) {
      setShowSignInSignUp(true);
    }
  };

  // Function to handle hover out of course card
  const handleCourseCardHoverOut = () => {
    // Prevent closing when hovering over the form
    if (!showSignInSignUp) {
      setShowSignInSignUp(false);
    }
  };

  // Function to close the form
  const handleCloseForm = () => {
    setShowSignInSignUp(false);
  };

  return (
    <div className="course-list">
      <div className="course-cards">
        {uniqueCategories.map((category, index) => {
          const course = courses.find(course => course.category === category);
          const image = getImageForCategory(category);
          return (
            <div
              className="course-card"
              key={index} // Use index as key since category itself is not unique
              onMouseEnter={handleCourseCardHover}
              onMouseLeave={handleCourseCardHoverOut}
            >
              <Link to={`/course/${category}`}>
                <div
                  className="course-image"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
                <div className="course-info">
                  <h3>{category}</h3>
                  <p>{course.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {showSignInSignUp && (
        <div className="sign-in-sign-up-container">
          <button className="close-button" onClick={handleCloseForm}>
            Close
          </button>
          <SignInSignUp />
        </div>
      )}
    </div>
  );
}

// Function to get the image URL for each category
function getImageForCategory(category) {
  switch (category) {
    case 'html_courses':
      return courseImage1;
    case 'css_courses':
      return courseImage2;
    case 'responsive_web_design_courses':
      return courseImage3;
      case 'css_preprocessors_courses':
      return courseImage4;
    default:
      return ''; 
  }
}

export default CourseList;
