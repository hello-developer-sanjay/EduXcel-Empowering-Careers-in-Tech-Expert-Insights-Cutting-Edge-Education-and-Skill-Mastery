import React from 'react';
import { useParams } from 'react-router-dom';
import CourseDetails from '../components/CourseDetails';

function Course() {
  const { title } = useParams(); // Use 'title' instead of 'id'

  return (
    <div>
      <h2>Course Details</h2>
      <CourseDetails title={title} />
    </div>
  );
}

export default Course;
