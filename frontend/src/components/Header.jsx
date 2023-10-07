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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 20px;
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
`;
const NavLinkItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px; /* Increased gap for better spacing */
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    

    svg {
      color: #67EB00 ; /* Change the color of SVG icons on hover */
    }

    img {
      transform: scale(1.1); /* Scale the image on hover for a zoom effect */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4); /* Stronger box shadow on hover */
    }
  }

  svg {
    font-size: 20px;
    transition: all 0.3s ease; /* Add transition for smooth color change */
  }

  img {
    width: 40px; /* Increased width for a larger profile image */
    height: 40px; /* Increased height for a larger profile image */
    border: 2px solid #fff; /* White border around the image */
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle box shadow effect */
    transition: all 0.3s ease; /* Add smooth transition effect */
   
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://xcel-back.onrender.com/api/profile', {
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
          setProfileImage(`https://xcel-back.onrender.com/${data.profileImage}?key=${Date.now()}`);
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
      <Nav>
        <NavList>
          <NavItem>
            <NavLinkItem to="/">
              <FontAwesomeIcon icon={faHome} />
         
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/profile">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                'Profile'
              )}
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/signup">
              <FontAwesomeIcon icon={faUserPlus} />
       
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/blogs">
              <FontAwesomeIcon icon={faNewspaper} />
          
            </NavLinkItem>
          </NavItem>
          {/* Add more navigation links */}
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
