import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import { styles } from '../styles';
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
        <title>Eduxcel - Online Education Platform</title>
        <meta name="description" content="Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge." />
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
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Explore our courses and enhance your skills
          </p>
          <div className='mt-10'>
            <CourseList courseData={courseData} /> {/* Pass course data as a prop to CourseList component */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
