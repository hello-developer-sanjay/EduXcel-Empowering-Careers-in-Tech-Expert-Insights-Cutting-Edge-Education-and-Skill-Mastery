import { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import axios from 'axios';

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
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className={`relative w-full min-h-screen mx-auto overflow-y-auto`}>
      <Helmet>
        <title>Eduxcel - Online Education Platform</title>
        <meta
          name="description"
          content="Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge."
        />
        {/* Add structured data for CourseList */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'ItemList',
          })}
        </script>
      </Helmet>

      <div className={`relative top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center`}>
        <div className="w-full max-w-2xl">
          <Slider {...sliderSettings}>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a.webp"
                alt="Image 1"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/b.webp"
                alt="Image 2"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/c.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/d.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/e.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/f.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>

        <div className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
  {/* Additional Engaging Cards */}
  <div className={`${styles.padding} bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-center text-white transform transition duration-300 hover:scale-105 hover:shadow-xl`}>
    <h2 className="text-2xl font-semibold mb-4">Interactive Learning</h2>
    <p className="text-gray-100">
      Dive into interactive lessons, quizzes, and assignments tailored for an immersive learning experience.
    </p>
  </div>
  <div className={`${styles.padding} bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-center text-white transform transition duration-300 hover:scale-105 hover:shadow-xl`}>
    <h2 className="text-2xl font-semibold mb-4">Expert Instructors</h2>
    <p className="text-gray-100">
      Learn from industry luminaries and passionate instructors who excel in the art of teaching.
    </p>
  </div>
  <div className={`${styles.padding} bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded-lg shadow-lg p-6 text-center text-white transform transition duration-300 hover:scale-105 hover:shadow-xl`}>
    <h2 className="text-2xl font-semibold mb-4">Flexible Learning</h2>
    <p className="text-gray-100">
      Embrace flexibility in your learning journey with adaptable schedules and on-the-go access to course materials.
    </p>
  </div>
</div>


        <div className="mt-10">
          <h2 className={`${styles.sectionHeadText} text-center mb-4`}>Featured Courses</h2>
          <p className={`${styles.heroSubText} mt-8 text-white-100 text-center`}>
          Explore our courses and enhance your skills
        </p>
        <div className="mt-10">
          <CourseList courseData={courseData} />
        </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
