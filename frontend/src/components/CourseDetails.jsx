import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/CourseDetails.css'; // Import your CSS file
import ReactPlayer from 'react-player';

function CourseDetails() {
  const { title } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await axios.get(`https://edu-backend-py90.onrender.com/api/courses/${encodeURIComponent(title)}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Error fetching course details. Please try again later.');
        setLoading(false);
      }
    }

    fetchCourseDetails();
  }, [title]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="container">
      <div className="course-details-container">
        <h2>Course Details</h2>
        <p>Title: {course.title}</p>
        <p>Description: {course.description}</p>
        <h3>Modules:</h3>
        <ul className="module-list">
          {course.syllabus.map((module, index) => (
            <li key={index}>
              <Link to={`/courses/${title}/${module.module}`} className="module-link">
                {module.module}
              </Link>
            </li>
          ))}
        </ul>
        <div className="video-container">
  <div className="video-wrapper">
    <ReactPlayer url={course.videoURL} controls className="react-player" />
  </div>
</div>

        <img src={course.imageURL} alt={course.title} className="module-image" />
      </div>
    </div>
  );
}

export default CourseDetails;
