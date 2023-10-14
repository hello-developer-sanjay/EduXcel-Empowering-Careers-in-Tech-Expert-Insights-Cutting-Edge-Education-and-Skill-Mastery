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
    arrows: false, // Show navigation arrows
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
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a2.webp"
                alt="Image 2"
                className="w-full h-[400px]"
              />
            </div>
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a5.webp"
                alt="Image 3"
                className="w-full h-[400px]"
              />
            </div>
            
            <div>
              <img
                src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a3.webp"
                alt="Image 3"
                className="w-full h-[400px]"
              />
            </div>
           
            {/* Add more slides as needed */}
          </Slider>
        </div>
        <div className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12`}>
  <div
    
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaChalkboardTeacher />
    </div>
    <h2 className="text-2xl font-semibold mb-4 " style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>Interactive Learning</h2>
    <p style={{ fontSize: '16px', color: '#ffffff' }}>
      Dive into interactive lessons, quizzes, and assignments tailored for an immersive learning experience.
    </p>
  </div>
  <div
    
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaUserGraduate />
    </div>
    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>
  Expert Instructors
</h2>

    <p style={{ fontSize: '16px' ,color: '#ffffff' }}>
      Learn from industry luminaries and passionate instructors who excel in the art of teaching.
    </p>
  </div>
  <div
   
    
    className="card"
  >
    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
      <FaClock />
    </div>
    <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>Flexible Learning</h2>
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
