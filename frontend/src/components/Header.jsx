import  { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faNewspaper } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #3498db, #2c3e50); /* Gradient background */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 0.5rem;
    flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
  border-bottom: 2px solid #2980b9; 


  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    background: linear-gradient(to right, #2c3e50, #3498db); /* Gradient background on hover */
    
  
`;

const HeaderContent = styled.div`
  margin-left: 20px;
  color: #fff;
  flex: 1;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #fff;
`;

const EduxcelText = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: #ff9900;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #00bfff;
  }

  &::before {
    content: "E";
    position: absolute;
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
    font-size: 35px;
    color: #00bfff;
    text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
  }
`;



const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  
`;

const NavItem = styled.li`
  white-space: nowrap;
  display: flex; /* Add this line to make the items flex containers */
  align-items: center; /* Center items vertically within each NavItem */
`;

const NavLinkItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px; /* Decreased gap to align icons horizontally with text */
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    svg {
      color: #67EB00; /* Change the color of SVG icons on hover */
    }

    img {
      transform: scale(1.1); /* Scale the image on hover for a zoom effect */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4); /* Stronger box shadow on hover */
    }
  }

  svg {
    font-size: 20px;
    transition: all 0.3s ease; /* Add transition for smooth color change */
    margin-right: 5px; /* Add right margin to separate the icon from text */
  }

  img {
    width: 40px; /* Increased width for a larger profile image */
    height: 40px; /* Increased height for a larger profile image */
    border: 2px solid #fff; /* White border around the image */
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle box shadow effect */
    transition: all 0.3s ease; /* Add smooth transition effect */
  }

  /* Provide meaningful labels for accessibility */
  &[aria-label='Home']::before {
    content: 'Home';
    display: none; /* Hide the label visually */
  }

  &[aria-label='Profile']::before {
    content: 'Profile';
    display: none; /* Hide the label visually */
  }

  &[aria-label='Sign Up']::before {
    content: 'Sign Up';
    display: none; /* Hide the label visually */
  }

  &[aria-label='Blogs']::before {
    content: 'Blogs';
    display: none; /* Hide the label visually */
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;
const HamburgerMenu = styled.div`
  @media (max-width: 768px) {
    display: none; /* Hide the menu by default */

    /* If isOpen is true, display the menu as a column */
    ${({ isOpen }) => isOpen && `
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #333;
      padding: 10px;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform: translateY(0);
      opacity: 1;
    `}
  }
`;



function Header() {
  const typedTexts = [
    "Spark Minds",
    "Explore Ideas",
    "Unleash Cognizance",
    "Nurture Genius",
    "Awaken Insight",
    "Brainwave Ballet"
  ];
  const [profileImage, setProfileImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://edu-backend-py90.onrender.com/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching user profile');
      })
      .then(data => {
        if (data.profileImage) {
          setProfileImage(`https://edu-backend-py90.onrender.com/${data.profileImage}?key=${Date.now()}`);
        } else {
          setProfileImage('https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp');
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setProfileImage('https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp');
      });
    } else {
      setProfileImage('https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp');
    }
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <Logo>
            <EduxcelText className="eduxcel-text">Eduxcel</EduxcelText>
          </Logo>
        </Link>
        <Typed
          strings={typedTexts}
          typeSpeed={40}
          backSpeed={40}
          loop
        />
      </HeaderContent>
      <HamburgerIcon onClick={toggleMenu}>
        ☰
      </HamburgerIcon>
      <HamburgerMenu isOpen={isOpen}>
        <NavList>
          <NavItem>
            <NavLinkItem to="/" aria-label="Home" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faHome} /> 
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/profile" aria-label="Profile" onClick={toggleMenu}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                'Profile'
              )}
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/signup" aria-label="Sign Up" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUserPlus} /> 
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/blogs" aria-label="Blogs" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faNewspaper} /> 
            </NavLinkItem>
          </NavItem>
          {/* Add more navigation links */}
        </NavList>
      </HamburgerMenu>
    </HeaderContainer>
  );
}

export default Header;
