import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/CourseList.css';
import courseImage1 from '../assets/full2.webp';
import courseImage2 from '../assets/binary2.webp';
import courseImage3 from '../assets/machine2.webp';
import SignInSignUp from './SignInSignUp';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showSignInSignUp, setShowSignInSignUp] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('https://edu-backend-py90.onrender.com/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

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
        {courses.map((course, index) => (
          <div
            className="course-card"
            key={course._id}
            onMouseEnter={handleCourseCardHover}
            onMouseLeave={handleCourseCardHoverOut}
          >
            <Link to={`/courses/${course.title}`}>
              <div
                className="course-image"
                style={{
                  backgroundImage: `url(${getImageForCourse(index)})`,
                }}
              ></div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </Link>
          </div>
        ))}
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

// Function to get the image URL for each course card
function getImageForCourse(index) {
  const courseImages = [courseImage1, courseImage2, courseImage3];
  return courseImages[index] || '';
}

export default CourseList;
