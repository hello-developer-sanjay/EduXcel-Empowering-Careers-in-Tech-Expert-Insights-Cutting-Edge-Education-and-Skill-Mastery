import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  margin-left: 20px;
  color: #fff;
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
  margin-right: 20px;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>Eduxcel</h1>
      </HeaderContent>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
         
          {/* Add more navigation links */}
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
