import  { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signupError, setSignupError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validator.isEmail(formData.email)) {
        setSignupError('Invalid email format');
        return;
      }

      const response = await axios.post('https://eduxcel-api-5jun.onrender.com/api/signup', formData);
      console.log('Signup success');
      setSignupSuccess('Signup successful!');
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
      setSignupError(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="form-container">
      <Helmet>
  <title>Join EduXcel: Unlock Your Learning Journey with Easy Signup</title>

  <meta name="description" content="Sign up for EduXcel E-Learning Platform to access high-quality courses and personalized learning experiences." />

  <meta name="keywords" content="signup,eduxcel, sanjay patidar , sanjay , signin, elearning,  register, e-learning, online education, courses, personalized learning" />

  <link rel="canonical" href="https://eduxcel.vercel.app/signup" />

  <meta property="og:title" content="Join EduXcel: Unlock Your Learning Journey with Easy Signup" />
  <meta property="og:description" content="Sign up for EduXcel E-Learning Platform to access high-quality courses and personalized learning experiences." />
  <meta property="og:url" content="https://eduxcel.vercel.app/signup" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/career_advice/security.gif" /> 
  <meta property="og:image:alt" content="EduXcel Logo" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Join EduXcel: Unlock Your Learning Journey with Easy Signup" />
  <meta name="twitter:description" content="Sign up for EduXcel E-Learning Platform to access high-quality courses and personalized learning experiences." />
  <meta name="twitter:url" content="https://eduxcel.vercel.app/signup" />
  <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/career_advice/security.gif" /> 

  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Join EduXcel: Unlock Your Learning Journey with Easy Signup",
      "description": "Sign up for EduXcel E-Learning Platform to access high-quality courses and personalized learning experiences.",
      "url": "https://eduxcel.vercel.app/signup"
    }
  `}</script>
</Helmet>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          {loading ? (
            <RingLoader color={'#ffffff'} loading={loading} css={override} size={30} />
          ) : (
            'Signup'
          )}
        </button>
        {signupError && <p className="error-message">{signupError}</p>}
        {signupSuccess && <p className="success-message">{signupSuccess}</p>}
      </form>
    </div>
  );
}

export default Signup;
