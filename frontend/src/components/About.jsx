import { FaCheckCircle } from 'react-icons/fa';
import responsiveImage from '../assets/b2.gif';
import technologyImage from '../assets/b1.gif';
import CreaTeaImage from '../assets/tea.gif';
import { motion } from 'framer-motion';
import Security from '../assets/s1.webp';
import Courses from '../assets/e.webp';
import '../styles/About.css'; // Import your custom CSS for additional styling

const About = () => {
  return (
    <motion.section className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container mx-auto">
        <motion.div className="flex flex-col items-center mb-12" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
            Welcome to <span className="text-yellow-500">EduXcel</span> E-Learning Wonderland!
          </h2>
          <p className="text-purple-700 text-center max-w-2xl font-bold">
            We are thrilled to introduce you to our innovative project, designed to revolutionize online education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  <motion.div className="flex flex-col items-center" style={{ width: "100%", maxWidth: "400px", border: "1px solid #ccc", borderRadius: "10px" }} whileHover={{ scale: 1.05 }}>
    <img src={responsiveImage} alt="Responsive Design" className="image" />
    <h3 className="text-2xl text-center font-semibold mb-4 text-blue-600">Responsive Learning Experience</h3>
    <p className="text-purple-700 mb-6 text-center max-w-sm">
      Access EduXcel on various devices, ensuring an optimal and user-friendly learning experience, from desktops to smartphones.
    </p>
  </motion.div>
  <motion.div className="flex flex-col items-center" style={{ width: "100%", maxWidth: "400px", border: "1px solid #ccc", borderRadius: "10px" }} whileHover={{ scale: 1.05 }}>
    <img src={technologyImage} alt="Cutting-edge Technology" className="image" />
    <h3 className="text-2xl text-center font-semibold mb-4 text-blue-600">Cutting-edge Technology</h3>
    <p className="text-purple-700 mb-6 text-center max-w-sm">
      Built with Vite + React, MongoDB, Express.js, Node.js, and other advanced technologies for rapid development and secure learning environments.
    </p>
  </motion.div>
</div>

<div className="mt-12 flex flex-wrap items-center">
  <div className="w-full md:w-1/2">
    <h3 className="text-3xl font-semibold mb-4 text-blue-600">Our Mission and Goals</h3>
    <ul className="list">
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Provide a diverse range of high-quality courses and educational content.
      </motion.li>
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Create a seamless and secure environment for online education.
      </motion.li>
      <motion.li className="list-item" whileHover={{ scale: 1.1 }}>
        <FaCheckCircle className="text-green-500 mr-2" />
        Offer personalized learning experiences tailored to individual needs.
      </motion.li>
    </ul>
  </div>
  <div className="w-full md:w-1/2 flex justify-center items-center">
  <img
    src={Courses}
    alt="Courses Image"
    className="max-w-full h-auto rounded-md shadow-lg  p-2"
    style={{ maxHeight: '600px' }} // Set maximum height for the image if needed
  />
</div>

</div>



        <div className="mt-12 flex flex-wrap items-center">
  <div className="w-full md:w-1/2">
    <h3 className="text-3xl font-semibold mb-4 text-blue-600">What Sets Us Apart</h3>
    <p className="text-purple-700">
      EduXcel prioritizes user satisfaction. Here's what you can expect from our platform:
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
  <div className="w-full md:w-1/2 flex justify-center items-center">
  <img
    src={Security}
    alt="Courses Image"
    className="max-w-full h-auto rounded-md shadow-lg  p-2"
    style={{ maxHeight: '600px' }} // Set maximum height for the image if needed
  />
</div>
</div>


        <div className="flex justify-center items-center my-12">
  <h2 className="text-2xl font-semibold text-blue-600 mr-4">Made With</h2>
  <h2 className="text-4xl font-semibold text-blue-600 flex items-center creativity">
    <span className="text-green-600">Crea</span>
    <img src={CreaTeaImage} alt="CreaTea" className="w-16 h-16 mx-2" />
    <span className="text-green-600">vity</span>
  </h2>
</div>




      </div>
    </motion.section>
  );
};

export default About;
