import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import { styles } from '../styles';
import axios from 'axios'; // Import axios for making API requests

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const coursesResponse = await axios.get('https://xcel-back.onrender.com/api/courses');
        const modulesResponse = await axios.get('https://xcel-back.onrender.com/api/modules');

        setCourseData(coursesResponse.data);
        setModuleData(modulesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
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

  useEffect(() => {
    async function search() {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setLoading(true);

      try {
        // Search for both courses and modules using the same endpoint
        const response = await axios.get(`https://xcel-back.onrender.com/search?query=${encodeURIComponent(searchTerm)}`);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error searching:', error);
        setLoading(false);
      }
    }

    search();
  }, [searchTerm]);


  return (
    <section className={`relative w-full min-h-screen mx-auto overflow-y-auto`}>
      <Helmet>
        <title>Eduxcel - Online Education Platform</title>
        <meta name="description" content="Explore our courses and modules and enhance your skills with Eduxcel. Find a wide range of online courses and modules on various topics to boost your knowledge." />
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
            Explore our courses and modules and enhance your skills
          </p>

          {/* Add a search bar */}
          <div className='mt-6'>
            <input
              type='text'
              placeholder='Search for courses and modules...'
              className='border border-gray-300 rounded-lg p-2 w-full'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Display search results */}
          {loading && <p>Loading...</p>}
          {!loading && searchResults.length === 0 && searchTerm.trim() !== '' && (
            <p>No results found for "{searchTerm}"</p>
          )}
          {!loading && searchResults.length > 0 && (
            <div className='mt-4'>
              <h2 className='text-lg font-semibold'>Search Results</h2>
              <ul>
                {searchResults.map((result) => (
                  <li key={result._id}>
                    {result.type === 'course' ? (
                      <a href={`/courses/${result.title}`}>{result.title}</a>
                    ) : (
                      <a href={`/courses/${result.courseTitle}/${result.moduleTitle}`}>{result.moduleTitle}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display the CourseList */}
          <div className='mt-10'>
            <CourseList courseData={courseData} /> {/* Pass course data as a prop to CourseList component */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
