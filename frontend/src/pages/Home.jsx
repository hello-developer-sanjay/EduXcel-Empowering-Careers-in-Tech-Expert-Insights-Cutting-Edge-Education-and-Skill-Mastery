import { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { motion, useAnimation } from 'framer-motion'; // Import Framer Motion
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import axios from 'axios';
import '../styles/home.css';
import StarsCanvas from '../components/Stars';
import { FaChalkboardTeacher, FaUserGraduate, FaClock } from 'react-icons/fa';
import WhyUsImage from '../assets/why.webp';
import About from '../components/About';
import Faq from '../components/Faq';
function Home() {
  const [courseData, setCourseData] = useState([]);
  const controls = useAnimation();

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

    // Animate the "why.png" image
    controls.start({
      scale: 1,
      rotateY: 360,
      opacity: 1,
      transition: { duration: 2 },
    });
  }, [controls]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
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
    <section className={`relative w-full min-h-screen mx-auto`}>
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

     <div className={`relative top-[10px] max-w-8xl mx-auto ${styles.paddingX} flex flex-col items-center`}>
  <div className="w-full max-w-4xl">
    <Slider {...sliderSettings}>
      <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a2.webp"
          alt="Image 2"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a3.webp"
          alt="Image 3"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a5.webp"
          alt="Image 3"
          className="w-full h-auto object-cover"
        />
      </div>
    </Slider>
  </div>
  <div className={`${styles.sectionHeadText} text-center mb-4`}>Featured Courses</div>
  <p className={`${styles.heroSubText} mt-8 text-white-100 text-center`}>Explore our courses and enhance your skills</p>
  <CourseList courseData={courseData} />
</div>


      <div className={`relative top-[20px] max-w-8xl mx-auto ${styles.paddingX} flex flex-col items-center`}>
        <div className={`mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12`}>
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              <FaChalkboardTeacher />
            </div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>
              Interactive Learning
            </h2>
            <p style={{ fontSize: '16px', color: '#ffffff' }}>
              Dive into interactive lessons, quizzes, and assignments tailored for an immersive learning experience.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              <FaUserGraduate />
            </div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>
              Expert Instructors
            </h2>
            <p style={{ fontSize: '16px', color: '#ffffff' }}>
              Learn from industry luminaries and passionate instructors who excel in the art of teaching.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              <FaClock />
            </div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff', textShadow: '1px 1px 2px #000000' }}>
              Flexible Learning
            </h2>
            <p style={{ fontSize: '16px', color: '#ffffff' }}>
              Embrace flexibility in your learning journey with adaptable schedules and on-the-go access to course materials.
            </p>
          </div>
        </div>
        <div className="why-us-section py-16 flex flex-col lg:flex-row items-center">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row items-center mb-12">
      <div className="shining-ring-container">
        <div className="shining-ring"></div>
        <div className="flex-container">
  <motion.img
    src={WhyUsImage}
    alt="Why Choose Us"
    className="w-full lg:w-full rounded-lg shadow-lg mb-6 lg-mb-0" // Adjust the width
    initial={{ scale: 0, opacity: 0 }}
    animate={controls}
  />

</div>

      </div>
      <div className="lg:w-1/2 lg:pl-12 why-us-content"> {/* New container div with a class */}
        <h3 className="text-2xl font-semibold mb-4">Interactive Learning Experiences</h3>
        <p className="text-gray-700 mb-6">
          Immerse yourself in interactive lessons, quizzes, and assignments designed to make learning engaging and enjoyable.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Expert Instructors & Industry Leaders</h3>
        <p className="text-gray-700 mb-6">
          Learn from passionate instructors who are experts in their fields and gain insights from industry leaders.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Flexible Learning at Your Fingertips</h3>
        <p className="text-gray-700 mb-6">
          Embrace flexibility with on-the-go access to course materials, allowing you to learn at your own pace and convenience.
        </p>
      </div>
    </div>
  </div>
</div>


      </div>
       <About/>
      <Faq/>
    </section>
  );
}

export default Home;
