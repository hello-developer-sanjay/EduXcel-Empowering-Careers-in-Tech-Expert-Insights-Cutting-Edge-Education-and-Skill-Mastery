import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
background: linear-gradient(to right, #1a1a2e, #16213e, #0d1b2a);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid #2980b9;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const HeaderContent = styled.div`
  margin-left: 20px;
  color: #fff;
  flex: 1;
`;

const Logo = styled.h1`
  font-size: 0px;
  margin: 0;
  color: #fff;
`;

const EduxcelText = styled.span`
  font-size: 25px;
  color: #51D5FF;
  font-family: 'Playfair Display', serif;

  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #FF9585;
    transform: translateY(-3px);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    z-index: -1;
    transition: transform 0.3s ease-in-out;
  }

  &::before {
    top: 0;
    left: 0;
    transform-origin: top left;
  }

  &::after {
    bottom: 0;
    right: 0;
    transform-origin: bottom right;
  }

  &:hover::before,
  &:hover::after {
    transform: scaleX(0);
  }

  & span {
    position: relative;
    z-index: 1;
    background: linear-gradient(45deg, #fff, #eee);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease-in-out;
  }

  &:hover span {
    background: linear-gradient(45deg, #e74c3c, #c0392b);
  }
`;
const LargeScreenText = styled(EduxcelText)`
  display: none;

  @media (min-width: 769px) {
    display: inline-block;
  }
`;

const SmallScreenText = styled(EduxcelText)`
  @media (min-width: 769px) {
    display: none;
  }
`;
const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const NavItem = styled.li`
  white-space: nowrap;
`;

const NavLinkItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #67EB00;

    &::before {
      transform: scaleX(1) translateX(0%);
    }
  }

  svg {
    font-size: 20px;
    transition: all 0.3s ease;
    margin-right: 5px;
  }

  img {
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #67EB00, #FFD700, #67EB00);
    transform: scaleX(0) translateX(-100%);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    padding: 8px 16px;
    box-sizing: border-box;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(360deg) scale(1.2);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 6px;
    background-color: #fff;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  &::before {
    transform: translateY(-12px);
  }

  &::after {
    transform: translateY(12px);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40px;
    width: 40px;

    &::before,
    &::after {
      width: 40px;
      height: 6px;
      background-color: #fff;
      border-radius: 8px;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      margin: 6px 0;
    }

    &.open::before {
      transform: translateY(6px) rotate(-45deg);
    }

    &.open::after {
      transform: translateY(-6px) rotate(45deg);
    }
  }
`;
const HamburgerMenu = styled.div`
  @media (max-width: 768px) {
    display: none;

    ${({ isOpen }) =>
      isOpen &&
      `
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: linear-gradient(to right, #5d4157, #a8caba);
        padding: 20px;
        transform-origin: top;
        animation: rollAndFold 0.5s ease-in-out;
        opacity: 1;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      `}
  }

  @keyframes rollAndFold {
    0% {
      transform: scaleY(0.1) translateY(-20px) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scaleY(0.5) translateY(0) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scaleY(1) translateY(0) rotate(360deg);
      opacity: 1;
    }
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
      fetch('https://edu-back-j3mz.onrender.com/api/profile', {
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
            setProfileImage(
              `https://edu-back-j3mz.onrender.com/${data.profileImage}?key=${Date.now()}`
            );
          } else {
            setProfileImage(
              'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'
            );
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          setProfileImage(
            'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'
          );
        });
    } else {
      setProfileImage(
        'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'
      );
    }
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
        <Logo>
            <LargeScreenText className="eduxcel-text">Eduxcel Mastery: Your Journey to Academic Brilliance</LargeScreenText>
            <SmallScreenText className="eduxcel-text">Eduxcel</SmallScreenText>
          </Logo>
        </Link>
        <Typed strings={typedTexts} typeSpeed={40} backSpeed={40} loop />
      </HeaderContent>
      <HamburgerIcon className={isOpen ? 'open' : ''} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>
      <HamburgerMenu isOpen={isOpen}>
        <NavList>
          <NavItem>
            <NavLinkItem to="/" aria-label="Home" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faHome} />
              Home
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/profile" aria-label="Profile" onClick={toggleMenu}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                'Profile'
              )}
              Profile
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/signup" aria-label="Sign Up" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUserPlus} />
              Sign Up
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/blogs" aria-label="Blogs" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faNewspaper} />
              Blogs
            </NavLinkItem>
          </NavItem>
          {/* Add more navigation links */}
        </NavList>
      </HamburgerMenu>
    </HeaderContainer>
  );
}

export default Header;
