import { useState } from 'react';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import '../styles/SignInSignUp.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';


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

  const handleClose = () => {
    setIsSignUp(false);
  };

  return (
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
   
  </div>

  
</div>

  );
}

export default SignInSignUp;
