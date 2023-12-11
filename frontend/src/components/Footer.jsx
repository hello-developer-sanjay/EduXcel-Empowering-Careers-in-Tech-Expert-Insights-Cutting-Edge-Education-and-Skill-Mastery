import  { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub,FaComment, FaUsers, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Sidebar.css";
import "react-toastify/dist/ReactToastify.css";

const FooterContainer = styled(motion.footer)`
  position: relative;
  background: linear-gradient(to right, #ffb6c1, #87cefa);

color: black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
`;

const BorderLineTop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100%;
  height: 4px;
  background: linear-gradient(to right, #ffbb00, #e85d04);
  background-size: 200% 100%;
  box-shadow: 0 0 10px rgba(232, 93, 4, 0.8);
  animation: gradientAnimation 2s linear infinite;
  @keyframes gradientAnimation {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const BorderLineBottom = styled(BorderLineTop)`
  top: auto;
  bottom: 0;
`;

const CatchyMessage = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  word-wrap: break-word;
`;

const SocialIconsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${props => props.color || '#3498db'};
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const FooterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
`;

const ContactInput = styled.input`
  padding: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const ContactTextArea = styled.textarea`
  padding: 1.5rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  color: #fff;
  background-color: #1a1a1a;
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:hover, &:focus {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  // Add a subtle pulsating animation on hover
  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    animation: pulse 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`;
const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffbb00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e85d04;
  }
`;

const QueryInput = styled(ContactTextArea)`
  // Additional styling for query input
`;
const QueryButton = styled(SubmitButton)`
  // Base styles from SubmitButton
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 1.3rem;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  // Additional styling specific to QueryButton
  margin-top: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  // Shining gradient border effect
  border: 2px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(135deg, #e74c3c, #3498db);
  transition: border 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2c3e50, #2c3e50);
    transform: translateY(-3px) scale(1.05);
    border: 2px solid #e74c3c;
  }

  // Add a subtle pulse animation on hover
  &:hover:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: pulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;








const Footer = () => {
  const catchyMessages = [
    "Stay Curious. Connect with Us!",
    "Join the Journey. Let's Learn Together.",
    "Exploring the Future. Get Involved!",
    "Unlock Knowledge. Engage and Share.",
  ];

  const getRandomCatchyMessage = () =>
    catchyMessages[Math.floor(Math.random() * catchyMessages.length)];

  const socialButtons = [
    { icon: <FaLinkedin />, label: "LinkedIn", link: "https://www.linkedin.com/in/sanjay-patidar-25b580292" },
    { icon: <FaGithub />, label: "GitHub", link: "https://github.com/hello-developer-sanjay" },
    { icon: <FaTwitter />, label: "Twitter", link: "#" },
    { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/sanjay_patidar_mcmxcviii" },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const feedback = formData.get("message");
    const query = formData.get("query");

    if (!name || !email) {
      toast.error("Please provide your name and email.");
      return;
    }

    if (!feedback && !query) {
      toast.error("Please provide either feedback or a query.");
      return;
    }

    try {
      let endpoint = "submit-feedback";
      let successMessage = "Feedback submitted successfully! Thank you for your feedback.";

      if (query) {
        endpoint = "submit-query";
        successMessage = "Query sent! Await our swift reply, tailored just for you.";
      }

      const response = await fetch(`https://portfolio-back-aruc.onrender.com/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          feedback: feedback || query,
          query,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(successMessage);
      } else {
        console.error("Error submitting feedback/query");
        toast.error("Error submitting feedback/query. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback/query:", error);
      toast.error("Error submitting feedback/query. Please try again later.");
    }
  };

  return (
    <FooterContainer>
      <BorderLineTop
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <BorderLineBottom
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <CatchyMessage>
        {getRandomCatchyMessage()}
      </CatchyMessage>
      <FooterButton
        color="#4db6ac"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Navigate to user profiles"
      >
        <FaUsers />
      </FooterButton>
      <AnimatePresence>
       <SocialIconsContainer>
          {socialButtons.map((button, index) => (
            <SocialIcon
              key={index}
              color={button.color}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.label} // Provide an accessible label for the link
            >
              {button.icon}
            </SocialIcon>
          ))}
        </SocialIconsContainer>
      </AnimatePresence>
      <ContactForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleFormSubmit}
      >
        <ContactInput type="text" name="name" placeholder="Your Name" />
        <ContactInput type="email" name="email" placeholder="Your Email" />
        <ContactTextArea
          name="message"
          rows="5"
          placeholder="Write your feedback here..."
        />
        <QueryInput
          name="query"
          rows="5"
          placeholder="Have a question? Write your query here..."
        />
       <QueryButton type="submit" aria-label="Submit feedback or query form">
        Submit
      </QueryButton>
      </ContactForm>
      <ToastContainer className="custom-toast-container" position="top-right" />
    </FooterContainer>
  );
};

export default Footer;
