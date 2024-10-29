import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'


function NavbarComponent() {
  return (
    <div className="navbar">
      <div className="container">
      <Link to="/" className="navbar-brand">
          <img src={'arms_logo.png'} alt="Home" className="logo" />
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
