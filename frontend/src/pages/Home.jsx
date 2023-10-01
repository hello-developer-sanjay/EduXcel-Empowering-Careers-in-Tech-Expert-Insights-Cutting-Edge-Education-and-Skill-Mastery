import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import axios from 'axios'; // Import axios for making API requests

function Home() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Fetch course data from your API endpoint
    async function fetchCourses() {
      try {
        const response = await axios.get('https://xcel-back.onrender.com/api/courses');
        setCourseData(response.data); // Assuming your API response is an array of course objects
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs once after initial render

  // Function to generate CourseList items for structured data
  function generateCourseListItems() {
    return courseData.map((course, index) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://eduxcel.vercel.app/courses/${encodeURIComponent(course.title)}`,
        "name": course.title,
        "description": course.description,
        "image": course.imageURL
      };
    });
  }

  return (
    <section className={`relative w-full min-h-screen mx-auto overflow-y-auto`}>
      <Helmet>
        <title>EduXcel E-Learning Platform</title>
        <meta name="description" content="EduXcel is a comprehensive e-learning platform that offers high-quality courses and personalized learning experiences. Explore our courses and enhance your skills with EduXcel." />
        {/* Add structured data for CourseList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            "itemListElement": generateCourseListItems()
          })}
        </script>
      </Helmet>

      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div>
          <h1>Welcome to EduXcel E-Learning Platform</h1>
          <p>We are thrilled to introduce you to our innovative project, designed to revolutionize online education.</p>

          <section>
            <h2>Purpose</h2>
            <p>EduXcel is a comprehensive e-learning platform aimed at enhancing the learning experience for both students and instructors. Our primary goals are:</p>
            <ul>
              <li>To provide a diverse range of high-quality courses and educational content.</li>
              <li>To create a seamless and secure environment for online education.</li>
              <li>To offer personalized learning experiences tailored to individual needs.</li>
            </ul>
          </section>

          <section>
            <h2>User Experience</h2>
            <p>At EduXcel, we prioritize user satisfaction. Here's what you can expect from our platform:</p>
            <ul>
              <li><strong>Secure Sign-Up:</strong> User data is protected with state-of-the-art security measures.</li>
              <li><strong>Personalized Profiles:</strong> Users can create and customize profiles to track their progress.</li>
              <li><strong>Tailored Recommendations:</strong> Our recommendation system suggests courses based on user preferences and learning history.</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Home;
