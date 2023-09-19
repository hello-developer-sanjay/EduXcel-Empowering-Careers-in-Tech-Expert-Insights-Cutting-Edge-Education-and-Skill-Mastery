import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
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
  gap: 20px; /* Add margin between NavItems */
  flex-wrap: wrap;
`;

const NavItem = styled.li`
  white-space: nowrap;
`;

const NavLinkItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #00bfff;
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

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <EduxcelText className="eduxcel-text">Eduxcel</EduxcelText>
        </Logo>
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
            <NavLinkItem to="/">Home</NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/profile">Profile</NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/signup">Signup</NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/blogs">Blogs</NavLinkItem>
          </NavItem>
          {/* Add more navigation links */}
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
