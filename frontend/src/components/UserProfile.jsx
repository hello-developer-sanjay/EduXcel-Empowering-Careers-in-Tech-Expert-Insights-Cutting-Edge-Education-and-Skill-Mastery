/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditProfile from './EditProfile';
import '../styles/UserProfile.css';
import { Link,  Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

import CreativeSpinner from './CreativeSpinner';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const LogoutConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="logout-confirmation-modal">

      <p className="confirmation-message">Are you sure you want to log out?</p>
      <div className="button-container">
        <button className="logout-button" onClick={onConfirm}>
          Yes, Log Out
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const UserProfile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [lastVisitedBlog, setLastVisitedBlog] = useState(null);

  useEffect(() => {
    // Retrieve last visited blog from local storage
    const storedLastVisitedBlog = localStorage.getItem('lastVisitedBlog');
    if (storedLastVisitedBlog) {
      setLastVisitedBlog(JSON.parse(storedLastVisitedBlog));
    }
  }, []);
  const handleLinkClick = () => {
    if (lastVisitedBlog) {
      navigate(`/blogs/${lastVisitedBlog.collection}/${encodeURIComponent(lastVisitedBlog.title)}`);
    }
  };

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin'); // Redirect the user to the login page
        return;
      }

      const response = await fetch('https://eduxcel-api-13april.onrender.com/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user profile: ${response.status}`);
      }

      const data = await response.json();
      
      // Set the user profile data in your state here
    setUserProfile(data); // Set the state with fetched user profile data

      setLoading(false);
      setError(null);

      // Only navigate if userProfile is not empty
      if (data && Object.keys(data).length > 0) {
        navigate('/profile');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fetchUserProfile();
}, [navigate]);
  const handleEditProfile = () => {
    setIsEditing(true);
  };

 const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://eduxcel-api-14april.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfileData,
      });

      if (!response.ok) {
        throw new Error(`Error updating user profile: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    // Show the logout confirmation modal
    setShowLogoutModal(true);
  };
  const confirmLogout = async () => {
    try {
      // Send a request to the server to log the user out
      await axios.post('https://eduxcel-api-14april.onrender.com/api/logout');
      // Clear the token from local storage
      localStorage.removeItem('token');
      // Redirect the user to the login page using navigate
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Close the modal after logout, whether successful or not
      setShowLogoutModal(false);
    }
  };

  const cancelLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);
  };

  

  return (
    <div className="user-profile-container">
         <Helmet>
    
    <title>Your Profile | EduXcel</title>
 <meta
   name="description"
   content="User data is protected with state-of-the-art security measures. Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design."
 />
 

 <meta property="og:title" content=" Your Profile | EduXcel" />
 <meta property="og:description" content="User data is protected with state-of-the-art security measures.Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://eduxcel.vercel.app/profile" />
 <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo_eduxcel.jpg" />
 <meta property="og:image:alt" content="Sanjay Patidar" />
 <meta property="og:site_name" content="Your Profile | EduXcel" />
  <link rel="canonical" href="https://eduxcel.vercel.app/profile" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="Your Profile | EduXcel" />
 <meta name="twitter:description" content="User data is protected with state-of-the-art security measures. Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design." />
 <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo_eduxcel.jpg" />
 <meta name="twitter:site" content="@sanjaypatidar" />
 <meta name="twitter:creator" content="@sanjaypatidar" />

 <meta name="keywords" content="portfolio, signup , secure, eduxcel ,founder: Sanjay patidar , tech, education, careers, opportunity, personal-portfolio,developer_sanju,sanjay, Sanjay, SANJAY, Sanjay Patidar, SANJAY PATIDAR, SANJAY WEB DEVELOPER, SANJAY DEVELOPER, Full Stack Web Developer, Mern Stack Web Developer, sanjay patidar, sanjay-patidar, professional, web developer portfolio, coder, web development, UI/UX design, Chandigarh University, EduXcel, Indore,contact, developer, programmer, engineer, AI, Artificial Intelligence ,tech enthusiastic, creativity ,creator, work , technology, coding, projects, experiences, resume, cv" />
 <meta name="author" content="EduXcel" />        <script type="application/ld+json">
       {JSON.stringify({
         '@context': 'http://schema.org',
         '@type': 'ItemList',
         "name": "Sanjay Patidar",
         "birthDate": "1998-07-01",
         "birthPlace": {
           "@type": "Place",
           "address": {
             "@type": "PostalAddress",
             "addressLocality": "Indore"
           }
         },
         "alumniOf": {
           "@type": "CollegeOrUniversity",
           "name": "Chandigarh University",
           "location": {
             "@type": "Place",
             "address": {
               "@type": "PostalAddress",
               "addressLocality": "Chandigarh",
               "addressRegion": "Punjab",
               "addressCountry": "India"
             }
           }
         },
         "address": [
           {
             "@type": "PostalAddress",
             "addressLocality": "Indore",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "452001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chandigarh",
             "addressRegion": "Punjab",
             "postalCode": "160001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Mumbai",
             "addressRegion": "Maharashtra",
             "postalCode": "400001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bangalore",
             "addressRegion": "Karnataka",
             "postalCode": "560001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Delhi",
             "addressRegion": "Delhi",
             "postalCode": "110001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kolkata",
             "addressRegion": "West Bengal",
             "postalCode": "700001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chennai",
             "addressRegion": "Tamil Nadu",
             "postalCode": "600001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Hyderabad",
             "addressRegion": "Telangana",
             "postalCode": "500001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Pune",
             "addressRegion": "Maharashtra",
             "postalCode": "411001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Ahmedabad",
             "addressRegion": "Gujarat",
             "postalCode": "380001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Jaipur",
             "addressRegion": "Rajasthan",
             "postalCode": "302001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Lucknow",
             "addressRegion": "Uttar Pradesh",
             "postalCode": "226001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhopal",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "462001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Nagpur",
             "addressRegion": "Maharashtra",
             "postalCode": "440001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Visakhapatnam",
             "addressRegion": "Andhra Pradesh",
             "postalCode": "530001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kochi",
             "addressRegion": "Kerala",
             "postalCode": "682001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Guwahati",
             "addressRegion": "Assam",
             "postalCode": "781001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhubaneswar",
             "addressRegion": "Odisha",
             "postalCode": "751001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Dehradun",
             "addressRegion": "Uttarakhand",
             "postalCode": "248001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Raipur",
             "addressRegion": "Chhattisgarh",
             "postalCode": "492001",
             "addressCountry": "India"
           }
         ],
         "worksFor": {
           "@type": "Organization",
           "name": "Eduxcel" 
         },
         "url": "https://sanjay-patidar.vercel.app/",
         "sameAs": [
           "https://www.linkedin.com/in/sanjay-patidar-25b580292/",
           "https://github.com/hello-developer-sanjay",
           "https://www.instagram.com/sanjay_patidar_mcmxcviii/",
           "https://eduxcel.vercel.app/",
           "https://eduxcel.vercel.app/profile",

           "https://eduxcel.vercel.app/forgot-password",

                        "https://eduxcel.vercel.app/signup"

         ]
   

       })}
     </script>


    </Helmet>
     
      <h1>User Profile</h1>
      {loading && (
        <motion.div
          className="loading-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <CreativeSpinner />
          <p className="loading-text">Loading...</p>
        </motion.div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
     {!loading && !error && userProfile && (
  <div className="profile-info">
    <div className="profile-image-container">
      <motion.img
        src={`https://eduxcel-api-14april.onrender.com/${userProfile.profileImage}?key=${Date.now()}`}
        alt="Profile"
        className="profile-image"
        whileHover={{ scale: 1.1 }}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite error loop
          e.target.src = 'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'; // Display a default image on error
        }}
      />
    </div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Bio: {userProfile.bio}</p>
          <Text
        fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} // Responsive font size
        fontWeight="bold" // Bold font weight
        color="gray.400" // Text color
        mb={{ base: 2, md: 4 }} // Margin bottom
      >
        Last Visited Blog 👇
      </Text> <p>     
      {/* Clickable link with different styles */}
      {lastVisitedBlog && (
        <Link
          onClick={handleLinkClick}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} // Responsive font size
          color="blue.500" // Text color
          _hover={{ textDecoration: 'underline' }} // Hover effect
          cursor="pointer" // Change cursor on hover
        >
          {lastVisitedBlog.title}
        </Link>
      )}</p>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        

        </div>
      )}
      {isEditing && (
  <EditProfile
    userProfile={userProfile}
    onUpdateProfile={handleUpdateProfile}
    onCancel={() => setIsEditing(false)} // Pass the onCancel function
  />
)}

            {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default UserProfile;
