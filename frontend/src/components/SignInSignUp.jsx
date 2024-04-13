/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import '../styles/SignInSignUp.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram } from "react-icons/fa";



import SecurityImage from '../assets/security.gif'; // Import your image
const H3 = styled.h1`
 color: #2ecc71;
   font-size: 1.5rem;
  margin-bottom: 0rem;
  font-weight: 900;
  font-family: 'Playfair Display', serif;
  margin-top: 0rem;
 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
  
  @media (max-width: 768px) {
    margin-top: 0rem;
    font-size: 1rem;

  }
`;

const Onlyforlap = styled.div`

  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
      display: none;
    margin-top: 0rem;
  
  }
`;

const Text = styled.h1`
  margin-top: 1rem;;
  font-size: 1.1rem;
  text-align: center;
  color: #fff; 
  padding: 5px 10px; /* Padding to create space around the text */

`;
const Next = styled.h1`
font-size: 1.1rem;
color: #f3f3f3;
margin-bottom: 1.5rem;
line-height: 1.4;
text-align: justify;
border-left: 4px solid #5d00ff;
border-right: 4px solid #5d00ff;

padding-left: 2px;
padding-right:2px;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const Introduction = styled(motion.p)`
font-size: 1.5rem;
line-height: 1.5;
text-align: center;
margin-top : 1rem;
margin-bottom: 1rem;
color: #ffffff; /* White on hover */
.highlight {
  position: relative;
  display: inline-block;
  font-size: 2rem;
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
  animation: highlightAnimation 3s ease-in-out infinite;
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


&:after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient border */
  margin-top: 8px;
  position: relative;
  animation: shimmerAnimation 3s ease-in-out infinite;
}


@keyframes shimmerAnimation {
  0% {
    background-position: -200% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
@media (max-width: 768px) {
margin-top:1rem;
font-size: 1.5rem;

}
`;
function SignInSignUp({ showCloseButton }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const copyContactNumberforlaptop = () => {
    const contactNumberforlap = document.getElementById('contactNumberforlaptop');
    const range = document.createRange();
    range.selectNode(contactNumberforlap);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Contact number copied ! Please use this contact number responsibly for legitimate purposes only. Illegal activities or unauthorized promotion are strictly prohibited. ');
  };
  const copyInstaIDforlaptop = () => {
    const instaIDforlap = document.getElementById('instaIDforlaptop');
    const range = document.createRange();
    range.selectNode(instaIDforlap);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Instagram ID copied ! Note: By copying this Instagram ID, you agree to use it for legitimate purposes only. Unauthorized promotion or misuse of this ID is strictly prohibited. ');
  };

  const copyPortfolioIDforlaptop = () => {
    const portfolioIDforlap = document.getElementById('portfolioIDforlaptop');
    const range = document.createRange();
    range.selectNode(portfolioIDforlap);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Website Link copied ! Reminder: By copying this link to Personal Portfolio website, you can access valuable Projects , Insights. Visit us for the latest in technology education. ');
  };
  
  

  const copyGithubIDforlaptop = () => {
    const githubID = document.getElementById('githubIDforlaptop');
    const range = document.createRange();
    range.selectNode(githubID);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Github Link copied ! Reminder: By copying this link to Github Profile, you can access valuable projects and insights. . ');
  };
  const copyLinkedinIDforlaptop = () => {
    const linkedinID = document.getElementById('linkedinIDforlaptop');
    const range = document.createRange();
    range.selectNode(linkedinID);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Linkedin Profile Link copied ! Reminder: By copying this link to Linkedin Profile, you can access valuable projects and insights. . ');
  };

  const handleClose = () => {
    setIsSignUp(false);
  };

  return (
    <>
    

    <div className="auth-content-container">
  
  <div className={`auth-box ${isSignUp ? 'signup' : 'signin'}`}>
    {showCloseButton && (
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    )}
    <div className="auth-content">
      <h1 className="sign-heading">{isSignUp ? 'Sign Up - EduXcel' : 'Sign In - EduXcel'}</h1>
      <Introduction>
<H3>Experience Secure SignIn with <span className="highlight">Eduxcel</span>, ensuring your data is safeguarded with state-of-the-art security measures.</H3>


    </Introduction>
    
     <div className="toggle-sign"> {isSignUp ? <Signup /> : <Signin />}</div>
    </div>
  
    <div className="auth-toggle">
      <p onClick={toggleForm} className="toggle-link">
        {isSignUp
          ? 'Already have an account? Sign in'
          : "Don't have an account? Sign up"}
      </p>

    </div>
    
  </div>
  <div className="auth-image">
    <img src={SecurityImage} alt="Security" />
    <Onlyforlap>
<Next>
  📞 Contact Sanjay Patidar Web Developer <span className="light">📞</span> {' '}
  <button onClick={() => window.location.href = 'tel:+917987235207'} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', boxShadow: '0px 0px 10px #ffd700' }}>Call Sanjay Patidar</button>
</Next>
    <Next>
    📞 Sanjay Patidar <span className="light">Contact | Mobile Number : </span>{' '}
      <a href="tel:+919131743250" id="contactNumberforlaptop" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>+91 9131743250</a> 📞 | OR |
      
      <button onClick={copyContactNumberforlaptop} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Number</button>
    </Next>

    <Next>
  🔗 <span className="light">Sanjay Patidar Instagram ID : </span>{' '}
  <a href="https://www.instagram.com/sanjay_patidar_mcmxcviii"style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="instaIDforlaptop" target="_blank">sanjay_patidar_mcmxcviii</a>
  {' '} | OR | {' '}
  <button onClick={copyInstaIDforlaptop} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Insta ID</button>
</Next>



<Next>
  🔗 <span className="light">Sanjay Patidar Github Profile : </span>{' '}
  <a href="https://github.com/hello-developer-sanjay"style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="githubIDforlaptop" target="_blank">hello-developer-sanjay</a>
  {' '} | OR | {' '}
  <button onClick={copyGithubIDforlaptop} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Github ID</button>
</Next>


<Next>
  🔗 <span className="light">Sanjay Patidar Linkedin Profile : </span>{' '}
  <a href="https://www.linkedin.com/in/sanjay-patidar-25b580292"style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="linkedinIDforlaptop" target="_blank">sanjay-patidar-25b580292</a>
  {' '} | OR | {' '}
  <button onClick={copyLinkedinIDforlaptop} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Linkedin ID</button>
</Next>
<Next>
  🔗 <span className="light">Sanjay Patidar</span>{' '}
  <a href="https://sanjay-patidar.vercel.app/"style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="portfolioIDforlaptop" target="_blank">https://sanjay-patidar.vercel.app</a>
  {' '} | OR | {' '}
  <button onClick={copyPortfolioIDforlaptop} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy WebLink</button>
</Next>
<Next>Based in Indore, Madhya Pradesh | Founder | Developer | Creator | Visionary | Creator </Next>
  </Onlyforlap>
  
  </div>

  
</div>


<Text>Eduxcel provides a diverse range of courses tailored just for you. Don't miss out—register now to discover your perfect fit! <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: 'none' }} href='https://eduxcel.vercel.app' target='_blank'>Click here</a> to secure your spot!</Text>
<Text>Discover the world of Sanjay Patidar: Innovator, Developer, and Founder. Ready to explore? <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: 'none' }} href='https://sanjay-patidar.vercel.app/' target='_blank'>Click here</a> to dive in!</Text>
<Text>
  <span style={{ color: '#ffbb00', fontWeight: 'bold', fontSize: '1.2rem' }}>©</span> All rights reserved to&nbsp;
  <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffbb00' }}>EduXcel</span> founded by&nbsp;
  <span style={{ fontWeight: 'bold', color: '#ffbb00' }}>Sanjay Patidar</span><br />
</Text>

</>
  );
}

export default SignInSignUp;
