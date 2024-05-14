import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CourseList.css';
import courseImage1 from '../assets/html.png';
import courseImage2 from '../assets/css.png';
import courseImage3 from '../assets/responsive1.png';
import courseImage4 from '../assets/preprocessors.png';
import SignInSignUp from './SignInSignUp';
import { RingLoader } from 'react-spinners'; // Import the RingLoader component
import styled from 'styled-components';
const LoadingOverlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0; /* Ensure it's above other elements */
`;
function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showSignInSignUp, setShowSignInSignUp] = useState(false);
  const [redirectCategory, setRedirectCategory] = useState(null);
  const { category } = useParams();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    async function fetchCourses() {
      try {
        let response;
        if (!category || category === 'all') {
          response = await axios.get('https://eduxcel-api-30april.onrender.com/api/courses/category/all');
        } else {
          response = await axios.get(`https://eduxcel-api-30april.onrender.com/api/courses/category/${category}`);
        }
        if (!response) {
          response = await axios.get('https://eduxcel-api-30april.onrender.com/api/courses/category');
        }
        setCourses(response.data);
                setLoading(false); // Set loading to false when data is fetched

      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, [category]);

  const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));

 const handleCourseCardClick = (clickedCategory) => {
    if (localStorage.getItem('token')) {
      setRedirectCategory(clickedCategory);
    } else {
      setShowSignInSignUp(true);
      toast.info('Please sign in to view the course details', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#040521',
          color: 'white',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '16px',
        }
      });
    }
  };
  const handleCloseForm = () => {
    setShowSignInSignUp(false);
  };

  const getImageForCategory = (category) => {
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
  };

  if (redirectCategory) {
    window.location.href = `/course/${redirectCategory}`;
    return null;
  }

  return (
    <section className={`relative w-full min-h-screen mx-auto`}>
      <div className="course-list">

         {loading && ( // Display loading animation if loading is true
        <LoadingOverlay>
          <RingLoader color="#fff" loading={loading} size={150} />
        </LoadingOverlay>
      )}  
        <div className="course-cards">
          {uniqueCategories.map((category, index) => {
            const course = courses.find(course => course.category === category);
            const image = getImageForCategory(category);
            return (
              <div
                className="course-card"
                key={index}
                onClick={() => handleCourseCardClick(category)}
              >
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
    </section>
  );
}

export default CourseList;
