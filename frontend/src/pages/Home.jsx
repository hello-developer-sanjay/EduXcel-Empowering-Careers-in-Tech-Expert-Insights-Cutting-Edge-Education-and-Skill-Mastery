import { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import axios from 'axios';
import "../styles/home.css";
import StarsCanvas from '../components/Stars'; 
import { FaChalkboardTeacher, FaUserGraduate, FaClock } from 'react-icons/fa'; 

function Home() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Fetch course data from your API endpoint
    async function fetchCourses() {
      try {
        const response = await axios.get('https://edu-backend-py90.onrender.com/api/courses');
        setCourseData(response.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const sliderSettings = {
    dots: true, // Show pagination dots
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true, // Enable fade transition between slides
    pauseOnHover: true, // Pause autoplay on hover
    arrows: true, // Show navigation arrows
    draggable: true, // Enable dragging the slider
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className={`relative w-full min-h-screen mx-auto `}>
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
      <StarsCanvas />

      <div className={`relative top-[20px] max-w-8xl mx-auto ${styles.paddingX} flex flex-col items-center`}>
        <div className="w-full max-w-4xl">
          <Slider {...sliderSettings}>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/g.webp"
                alt="Image 1"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/h.webp"
                alt="Image 2"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/i.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/j.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/k.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/l.webp"
                alt="Image 3"
                className="w-full h-[300px]"
              />
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
        <div className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12`}>
  <div
    style={{
      border: '2px solid #3498db',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
      animation: 'slide-in-bounce 1s ease',
      transition: 'transform 0.3s ease',
      backgroundColor: '#3498db',
      color: '#ffffff',
    }}
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaChalkboardTeacher />
    </div>
    <h2 className="text-2xl font-semibold mb-4 " style={{ color: '#000000', textShadow: '1px 1px 2px #ffffff' }}>Interactive Learning</h2>
    <p style={{ fontSize: '16px', color: '#ffffff' }}>
      Dive into interactive lessons, quizzes, and assignments tailored for an immersive learning experience.
    </p>
  </div>
  <div
    style={{
      border: '2px solid #9b59b6',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
      animation: 'slide-in-bounce 1s ease',
      transition: 'transform 0.3s ease',
      backgroundColor: '#9b59b6',
      color: '#ffffff',
    }}
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaUserGraduate />
    </div>
    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#000000', textShadow: '1px 1px 2px #ffffff' }}>
  Expert Instructors
</h2>

    <p style={{ fontSize: '16px' ,color: '#ffffff' }}>
      Learn from industry luminaries and passionate instructors who excel in the art of teaching.
    </p>
  </div>
  <div
    style={{
      border: '2px solid #27ae60',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
      animation: 'slide-in-bounce 1s ease',
      transition: 'transform 0.3s ease',
      backgroundColor: '#27ae60',
      color: '#ffffff',
    }}
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaClock />
    </div>
    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#000000', textShadow: '1px 1px 2px #ffffff' }}>Flexible Learning</h2>
    <p style={{ fontSize: '16px' , color: '#ffffff'}}>
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
