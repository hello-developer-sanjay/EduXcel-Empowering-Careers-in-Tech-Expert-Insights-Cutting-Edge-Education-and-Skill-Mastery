import { useState } from 'react';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import '../styles/SignInSignUp.css';
import SecurityImage from '../assets/security.gif'; // Import your image

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
      {isSignUp ? <Signup /> : <Signin />}
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
