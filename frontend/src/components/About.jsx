import { FaCheckCircle } from 'react-icons/fa';

import CreaTeaImage from '../assets/tea.gif';
import { motion } from 'framer-motion';
import Typed from 'react-typed';
import styled from 'styled-components';
import unlock from "../assets/unlock.gif";
import Message from './Message';
import '../styles/About.css';
import DuckImage from "../assets/duck4.gif";
import { Helmet } from 'react-helmet';

const ProfileTextContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 100%;
margin-top: 0rem;
margin-right: 1rem;
height: 180px;
@media (min-width: 768px) {
  text-align: left;
  margin-top: 0;

}
@media (max-width: 768px) {
  
  max-width: 90%;

}
`;
const StyledText = styled.span`
  .eduxcel-text {
    font-size: 40px;
    font-weight: bold; 
    position: relative; 
    color: #fff; 

    &:hover {
      color: #fbbf24; 
    }

    /* Styling the "X" */
    &:before {
      content: '';
    }

    .x-letter {
      color: #fbbf24;
      margin-left: 10px;
      font-size: 48px; 
      font-family: 'Bangers', cursive; 
      transform: skew(-20deg, -5deg) scaleX(1.2); 
      display: inline-block;
      position: relative;
      top: -5px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
    }
    
  }
`;


const H1Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: none;
    margin-top: 0rem;
  
  }
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  color: #2ecc71;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-family: 'Playfair Display', serif;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px; /* Increase letter spacing for a stylish look */
  transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
`;

const StyledCreaTeaImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(46, 204, 113, 0.5);
`;

const StyledUnlockImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem; 
  box-shadow: 0px 0px 10px rgba(46, 204, 113, 0.5);
`;

const StyledSpan = styled.span`
  color: #ffffff;
  font-size: 1.5rem; /* Increase font size for emphasis */
  font-weight: bold;
  font-family: 'Playfair Display', serif;

  letter-spacing: 3px; /* Add more letter spacing */
  text-transform: uppercase;
  text-decoration: underline; /* Add an underline for a decorative touch */
  /* Add any additional styles here */
`;


const H2 = styled.h1`
color: #2ecc71;
  font-size: 3rem;
 margin-bottom: 0rem;
 font-weight: 900;
 font-family: 'Playfair Display', serif;
 margin-top: 0rem;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
 transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
 
 @media (max-width: 768px) {
   margin-top: 0rem;
   font-size: 1.5rem;

 }
`;
const H3 = styled.h1`
color: #2E35D2;
  font-size: 3rem;
 margin-bottom: 0rem;
 font-weight: 900;
 font-family: 'Playfair Display', serif;
 margin-top: 0rem;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
 transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
 
 @media (max-width: 768px) {
   margin-top: 0rem;
   font-size: 1.5rem;

 }
`;
const TypedText = styled.span`
    display: block;
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-transform:uppercase;
    font-style: italic;
    font-weight: bold;
    font-size: 4rem;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 1rem;

    }

    /* Change the color of the typing text */
    @media (prefers-color-scheme: dark) {
      color: #51D5FF; /* Bright yellow in dark mode */
    }

    @media (prefers-color-scheme: light) {
      color: #ffffff; /* Deep orange in light mode */
    }
  `;

 const Introduction = styled(motion.p)`
 font-size: 1.5rem;
 line-height: 1.5;
 max-width: 800px;
 text-align: center;
 margin-top : 1rem;
 margin-bottom: 1rem;
 color: #ffffff; /* White on hover */

 
 .highlight {
   position: relative;
   display: inline-block;
   font-size: 4rem;
   font-weight: bold;
   color: transparent;
   background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient highlight */
   background-clip: text;
   -webkit-background-clip: text;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow for depth */
   padding-bottom: 5px;
   margin-bottom: 1px;
   line-height: 4rem;
   /* Animation for the highlight class */
   @media (max-width: 768px) {
 font-size: 1.5rem;
 line-height: 2rem;

 }
 }


 @keyframes highlightAnimation {
   0%, 100% {
     background-position: 0% 50%;
   }
   50% {
     background-position: 100% 50%;
   }
 }


 @media (max-width: 768px) {
 margin-top:1rem;
 font-size: 1.5rem;

 }
`;


const About = () => {
  
  
  const educationalFeatures = [
    "User profile page: The user profile page enables users to view and modify their personal information, including their name, email address, and profile picture.",
    "Course page: Users can easily access a list of available courses and enroll directly from the course page. Additionally, users can track their course progress.",
    "Module page: Users can view module content and complete module activities directly from the module page, with progress tracking capabilities.",
    "Submodule page: Similar to the module page, users can view and complete submodule content and activities, with progress tracking.",
    "Quiz page: The application provides a dedicated quiz page where users can take quizzes to assess their learning, view their results, and review their answers."
  ];
  
 
  return (
    <>
     <Helmet>
    
    <title>EduXcel | About Us - Empowering Tech Careers through Expertise and Innovation</title>
 <meta
   name="description"
   content="At EduXcel, we believe that education is the cornerstone of progress, and technology serves as the catalyst for innovation. Our mission is simple yet ambitious: to provide expert insights, cutting-edge education, and skill mastery opportunities to learners worldwide.As a passionate advocate for education and technology, I understand the transformative power they hold. From my own experiences as a student to my endeavors in web development and UI/UX design, I've witnessed firsthand the profound impact that knowledge and innovation can have on one's journey.Through EduXcel, we strive to cultivate a dynamic learning community where curiosity is encouraged, challenges are embraced, and growth is inevitable. Whether you're a seasoned professional seeking to enhance your skills or a budding enthusiast eager to explore new horizons, you'll find a wealth of resources and support within our platform.Our commitment extends beyond just providing information; we are dedicated to fostering a culture of collaboration, creativity, and excellence. Together, let's embark on a journey of discovery, where each lesson learned and every skill mastered brings us closer to our goals.
Empower your learning journey with EduXcel, the leading platform for high-quality online education. Explore diverse courses, personalized learning, and discover how to deploy websites on Vercel and Render backend hosting.Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design. Based in Indore, Madhya Pradesh, Sanjay serves clients across India, including	Chandigarh, Punjab, Mumbai,Maharashtra, Bangalore,Karnataka, Delhi, Kolkata, West Bengal, Chennai, Tamil Nadu, Hyderabad, Telangana, Pune, Ahmedabad, Gujarat, Jaipur, Rajasthan, Lucknow, Uttar Pradesh, Bhopal, Nagpur, Visakhapatnam, Andhra Pradesh, Kochi, Kerala, Guwahati, Assam, Bhubaneswar, Odisha, Dehradun, Uttarakhand, Raipur, Chhattisgarh,  and beyond.User data is protected with state-of-the-art security measures. Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design."
 />
 

 <meta property="og:title" content=" EduXcel | About Us - Transforming Tech Careers with Expert Insights and Cutting-Edge Education" />
 <meta property="og:description" content="At EduXcel, we believe that education is the cornerstone of progress, and technology serves as the catalyst for innovation. Our mission is simple yet ambitious: to provide expert insights, cutting-edge education, and skill mastery opportunities to learners worldwide.As a passionate advocate for education and technology, I understand the transformative power they hold. From my own experiences as a student to my endeavors in web development and UI/UX design, I've witnessed firsthand the profound impact that knowledge and innovation can have on one's journey.Through EduXcel, we strive to cultivate a dynamic learning community where curiosity is encouraged, challenges are embraced, and growth is inevitable. Whether you're a seasoned professional seeking to enhance your skills or a budding enthusiast eager to explore new horizons, you'll find a wealth of resources and support within our platform.Our commitment extends beyond just providing information; we are dedicated to fostering a culture of collaboration, creativity, and excellence. Together, let's embark on a journey of discovery, where each lesson learned and every skill mastered brings us closer to our goals.
Empower your learning journey with EduXcel, the leading platform for high-quality online education. Explore diverse courses, personalized learning, and discover how to deploy websites on Vercel and Render backend hosting.Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design. Based in Indore, Madhya Pradesh, Sanjay serves clients across India, including	Chandigarh, Punjab, Mumbai,Maharashtra, Bangalore,Karnataka, Delhi, Kolkata, West Bengal, Chennai, Tamil Nadu, Hyderabad, Telangana, Pune, Ahmedabad, Gujarat, Jaipur, Rajasthan, Lucknow, Uttar Pradesh, Bhopal, Nagpur, Visakhapatnam, Andhra Pradesh, Kochi, Kerala, Guwahati, Assam, Bhubaneswar, Odisha, Dehradun, Uttarakhand, Raipur, Chhattisgarh,  and beyond.User data is protected with state-of-the-art security measures.Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://eduxcel.vercel.app/about-us" />
 <meta property="og:image:alt" content="Sanjay Patidar" />
 <meta property="og:site_name" content="EduXcel | About Us - Transforming Tech Careers with Expert Insights and Cutting-Edge Education" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content=" EduXcel | About Us - Transforming Tech Careers with Expert Insights and Cutting-Edge Education" />
 <meta name="twitter:description" content="At EduXcel, we believe that education is the cornerstone of progress, and technology serves as the catalyst for innovation. Our mission is simple yet ambitious: to provide expert insights, cutting-edge education, and skill mastery opportunities to learners worldwide.As a passionate advocate for education and technology, I understand the transformative power they hold. From my own experiences as a student to my endeavors in web development and UI/UX design, I've witnessed firsthand the profound impact that knowledge and innovation can have on one's journey.Through EduXcel, we strive to cultivate a dynamic learning community where curiosity is encouraged, challenges are embraced, and growth is inevitable. Whether you're a seasoned professional seeking to enhance your skills or a budding enthusiast eager to explore new horizons, you'll find a wealth of resources and support within our platform.Our commitment extends beyond just providing information; we are dedicated to fostering a culture of collaboration, creativity, and excellence. Together, let's embark on a journey of discovery, where each lesson learned and every skill mastered brings us closer to our goals.
Empower your learning journey with EduXcel, the leading platform for high-quality online education. Explore diverse courses, personalized learning, and discover how to deploy websites on Vercel and Render backend hosting.Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design. Based in Indore, Madhya Pradesh, Sanjay serves clients across India, including	Chandigarh, Punjab, Mumbai,Maharashtra, Bangalore,Karnataka, Delhi, Kolkata, West Bengal, Chennai, Tamil Nadu, Hyderabad, Telangana, Pune, Ahmedabad, Gujarat, Jaipur, Rajasthan, Lucknow, Uttar Pradesh, Bhopal, Nagpur, Visakhapatnam, Andhra Pradesh, Kochi, Kerala, Guwahati, Assam, Bhubaneswar, Odisha, Dehradun, Uttarakhand, Raipur, Chhattisgarh,  and beyond.User data is protected with state-of-the-art security measures. Explore our courses and enhance your skills with Eduxcel. Find a wide range of online courses on various topics to boost your knowledge. Discover the remarkable journey of Sanjay Patidar, a dedicated and passionate individual excelling in the realms of web development and UI/UX design. As a Computer Science and Engineering student, Sanjay embodies a profound commitment to mastering the intricacies of programming, with a specialized focus on crafting immersive digital experiences. Currently pursuing a Bachelor of Engineering degree at Chandigarh University, Sanjay brings forth a proactive approach and an unwavering dedication to excellence in all endeavors. His educational odyssey began at Jawahar Navodaya Vidyalaya School, where he laid the foundation for his academic and extracurricular prowess from 2009 to 2016. This esteemed residential institution, administered under the Ministry of Education, fostered holistic development and instilled a fervent pursuit of excellence. Throughout his tenure, Sanjay actively engaged in a plethora of inter-school competitions, showcasing his versatility and achieving distinction in both academic and non-academic domains. Building upon this robust foundation, Sanjay embarked on his tertiary education journey at Chandigarh University, where he embarked on a quest for knowledge and innovation. Embracing the cutting-edge infrastructure and progressive pedagogical approaches of the university, he delved deep into the intricacies of Computer Science Engineering. His academic trajectory is marked by a stellar GPA of 7.5, a testament to his unwavering dedication and intellectual acumen. Beyond the confines of academia, Sanjay's passion for technology extends to the realms of practical application. Actively participating in coding competitions, hackathons, and collaborative projects, he honed his problem-solving prowess and cultivated invaluable teamwork skills. His journey is characterized by a relentless pursuit of excellence, driven by a profound sense of creativity, innovation, and a commitment to delivering exceptional digital solutions. Explore the professional portfolio of Sanjay Patidar, where innovation meets expertise, and witness firsthand the culmination of passion, creativity, and a relentless pursuit of excellence in web development and UI/UX design." />
 <meta name="twitter:site" content="@sanjaypatidar" />
 <meta name="twitter:creator" content="@sanjaypatidar" />

 <meta name="keywords" content="portfolio, signup , eduxcel, about us , about eduxcel , tech, education, careers, opportunity, personal-portfolio,developer_sanju,sanjay, Sanjay, SANJAY, Sanjay Patidar, SANJAY PATIDAR, SANJAY WEB DEVELOPER,about Eduxcel SANJAY DEVELOPER, Full Stack Web Developer, Mern Stack Web Developer, sanjay patidar, sanjay-patidar, professional, web developer portfolio, coder, web development, UI/UX design, Chandigarh University, EduXcel, Indore,contact, developer, programmer, engineer, AI, Artificial Intelligence ,tech enthusiastic, creativity ,creator, work , technology, coding, projects, experiences, resume, cv" />
 <meta name="author" content="Sanjay Patidar" />      
       
   
    </Helmet>

    <motion.section className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container mx-auto">
        <motion.div className="flex flex-col items-center mb-12" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
        <StyledText>
 <H3>Welcome to <span className="eduxcel-text">Edu<span className="x-letter">X</span>cel</span> E-Learning Wonderland!</H3>
</StyledText>
   <ProfileTextContainer>
          <Introduction
    initial={{ opacity: 0, y: -100,  scale: 0.5 }} 
    animate={{ opacity: 1, y: 0, scale: 1 }} 
    transition={{
      type: "spring", 
      stiffness: 200, 
      damping: 12, 
      delay: 1, 
      duration: 0.8 
    }}
  >
       
          
          <TypedText>
          <H2>

  <Typed
strings={[
  'Explore Cutting-Edge Tech Insights with EduXcel',
  'Unleash Your Potential: Dive into EduXcel',
  'Master Tech Skills: Your Journey Starts with EduXcel',
  'EduXcel: Your Passport to Tech Mastery',
  'Tech Evolution Awaits: EduXcel Leads the Way',
  'Discover Innovation Beyond Boundaries with EduXcel',
  'Forge Your Tech Career with EduXcel',
  'EduXcel: Where Tech Dreams Take Flight',
  'Empower Your Journey: EduXcel Lights the Path',
  'EduXcel: Where Learning Meets Innovation',
]}
    typeSpeed={60}
    backSpeed={60}
    smartBackspace={true}
    shuffle={false}
    backDelay={1500}
    loop
  />
  </H2>
</TypedText>
  
          </Introduction>
          </ProfileTextContainer>
          <p className="text-purple-700 text-center max-w-6xl font-bold" style={{ fontSize: '20px' }}>
          Step into the future of online education with us! Our groundbreaking project is set to redefine the way you learn.


</p>
        </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div className="flex flex-col items-center" style={{ width: "100%", maxWidth: "400px",  border: "1px solid #ccc", borderRadius: "10px"  , overflow: "hidden"  }} whileHover={{ scale: 1.05 }}>
              <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/responsive-learning.gif " alt="Responsive Design" className="image" style={{ width: "100%", maxWidth: "400px",Height: "200px",  border: "1px solid #ccc", borderRadius: "10px"  , overflow: "hidden"  }} />
             <h3 className="text-2xl text-center font-semibold mb-4 text-blue-600">Responsive Learning Experience</h3>
          <p className="text-purple-700 mb-6 text-center max-w-sm">
              Access EduXcel on various devices, ensuring an optimal and user-friendly learning experience, from desktops to smartphones.
               </p>
            </motion.div>
            <motion.div className="flex flex-col items-center" style={{ width: "100%", maxWidth: "400px", border: "1px solid #ccc", borderRadius: "10px" , overflow: "hidden"  }} whileHover={{ scale: 1.05 }}>
              <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/cutting-edge.gif" alt="Cutting-edge Technology" className="image" style={{ width: "100%",Height: "600px",  border: "1px solid #ccc", borderRadius: "10px"  , overflow: "hidden"  }}/>
            <h3 className="text-2xl text-center font-semibold mb-4 mt-10 text-blue-600">Cutting-edge Technology</h3>
              <p className="text-purple-700 mb-6 text-center max-w-sm">
              Harnessing the power of the MERN stack (MongoDB, Express.js, React, Node.js), our platform is built for innovation and efficiency. Leveraging Vite for lightning-fast development, alongside other advanced technologies, we create secure and immersive learning environments that propel your growth.
                </p>
                </motion.div>
         </div>
<div className="mt-12 flex flex-wrap items-center">
  <div className="w-full md:w-1/2">
    <h3 className="text-3xl font-semibold mb-4 text-blue-600">Our Mission and Goals</h3>
    <ul className="list">
  <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
    <FaCheckCircle className="text-green-500 mr-2" />
    Provide a diverse range of high-quality courses and educational content, spanning various subjects and skill levels to cater to a wide audience.
  </motion.li>
  <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
    <FaCheckCircle className="text-green-500 mr-2" />
    Create a seamless and secure environment for online education by implementing robust security measures, ensuring the safety of user data and interactions.
  </motion.li>
  <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
    <FaCheckCircle className="text-green-500 mr-2" />
    Offer personalized learning experiences tailored to individual needs, including customized course recommendations and adaptive learning paths.
  </motion.li>
</ul>

  </div>
  <div className="w-full md:w-1/2 flex justify-center items-center">
  <img
    src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/e.webp"
    alt="Courses Image"
    className="max-w-full h-auto rounded-md shadow-lg p-2 "
    style={{ maxHeight: '600px' }} 
  />
</div>

</div>



        <div className="mt-12 flex flex-wrap items-center">
  <div className="w-full md:w-1/2">
    <h3 className="text-3xl font-semibold mb-4 text-blue-600">What Sets Us Apart</h3>
    <p className="text-purple-700">
  EduXcel prioritizes user satisfaction.
  <br />
  Here's what you can expect from our platform:
</p>

    <ul className="list mt-4">
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Secure Sign-Up: User data is protected with state-of-the-art security measures.
      </motion.li>
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Personalized Profiles: Users can create and customize profiles to track their progress.
      </motion.li>
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Tailored Recommendations: Our recommendation system suggests courses based on user preferences and learning history.
      </motion.li>
    </ul>
  </div>
  <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0"> 
  <img
    src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/s1.webp"
    alt="Courses Image"
    className="max-w-full h-auto rounded-md shadow-lg p-2 shining-border"
    style={{ maxHeight: '400px' }} 
  />
</div>
</div>

        {/* Educational Features */}
        <div className="mt-12 flex flex-wrap items-center ">
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-semibold mb-4 text-blue-600">Educational Features</h3>
          <ul className="list mt-4">
            {/* Iterate through educational features and display them */}
            {educationalFeatures.map((feature, index) => (
              <motion.li className="list-item" whileHover={{ scale: 1.1 }} key={index}>
                <FaCheckCircle className="text-green-500 mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>
          
        </div>
        
         <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0"> 
  <img
    src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/a6.webp"
    alt="Feature Image"
    className={`max-w-full h-auto rounded-md  shadow-lg p-2 shining-border`}
    style={{ maxHeight: '400px' }} 
  />
</div>

   
        </div>
        <div style={{ marginTop: '40px' }}>
  <Message />
</div>



         
        <div className="flex justify-center items-center  mt-4">
  <H1 className="text-2xl font-semibold text-green-600 mr-4 ">Made With</H1>
  <h2 className="text-4xl font-semibold text-blue-600 flex items-center creativity">
  <StyledSpan className="text-white-600">Crea</StyledSpan>
    <img src={CreaTeaImage} alt="CreaTea" className="w-12 h-12 mx-2" />
    <StyledSpan className="text-green-600">vity</StyledSpan>
  </h2>
</div>
      </div>
      <H1Container>
          <H1>Discover the Key to Enhanced 
</H1>
          <h1 className="text-4xl font-semibold text-blue-600 flex items-center creativity">
            <StyledSpan className="text-white-600">Pro</StyledSpan>
            <StyledCreaTeaImage src={DuckImage} alt="CreaTea" className="mx-2" />
            <StyledSpan className="text-green-600">tivity</StyledSpan>
          </h1>
          
            <H1>: Partner with Us to 
            </H1>
            <h1 className="text-4xl font-semibold text-blue-600 flex items-center creativity">

          <StyledUnlockImage src={unlock} alt="Unlock" className="mx-2" />
          </h1>

          <H1>
            Your Full Potential !</H1>
        </H1Container>
    </motion.section>
    </>
  );
};


export default About;
