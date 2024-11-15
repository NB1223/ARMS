import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import { useAuth0 } from '@auth0/auth0-react';


function NavbarComponent() {

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  // Check if the authenticated user is a teacher
  const username = user?.email?.substring(0, 13);
  const studentPattern = /^pes[12]202[23][0-9]{4}[1-9]$/;

  return (
    <div className="navbar">
      <div className="container">
      <Link to="/" className="navbar-brand">
          <img src={'arms_logo.png'} alt="Home" className="logo" />
        </Link>
        <nav className="nav">
          {/* <Link to="/courses" className="nav-link">Courses</Link> */}
          <Link to={studentPattern.test(username) ? '/courses' : '/teacher_courses'} className="nav-link">
              Courses
          </Link>
          
          {/* <Link to="/about_us" className="nav-link">About Us</Link> */}
          {isAuthenticated ? (
            <Link 
              onClick={() => logout({ returnTo: window.location.origin })} 
              className="nav-link logout-button"
            >
              Logout
            </Link>
          ) : (
            <Link
              onClick={() => loginWithRedirect()} 
              className="nav-link login-button"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
