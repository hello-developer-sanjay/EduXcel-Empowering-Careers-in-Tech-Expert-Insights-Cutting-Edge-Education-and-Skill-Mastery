import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/SubHeader.css';

function SubHeader() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('https://eduxcel-api-5jun.onrender.com/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    const courseTitle = event.target.value;
    const selectedCourse = courses.find((course) => course.title === courseTitle);
    setSelectedCourse(selectedCourse);
    if (selectedCourse && selectedCourse.category) {
      navigate(`/course/${selectedCourse.category}`);
    }
  };
  
  return (
    <div className="subheader">
      <div className="dropdown-container">
        <label htmlFor="coursesDropdown" className="dropdown-label">
          Select a Course:
        </label>
        <select
          id="coursesDropdown"
          onChange={handleCourseChange}
          value={selectedCourse?.title || ''}
          className="courses-dropdown"
        >
          <option value="" className="dropdown-option">
            Choose a Course
          </option>
          {courses.map((course) => (
            <option
              key={course._id}
              value={course.title}
              className="dropdown-option"
            >
              {course.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SubHeader;
