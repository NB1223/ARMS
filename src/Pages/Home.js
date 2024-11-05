// src/Home.js
import React from 'react';
// import BG_image from '../images/BG_image.jpg'; 
import BG_image from '../images/main_bg.jpg'; 
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const backgroundImageStyle = {
    backgroundImage: `url(${BG_image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '97vh',
    width: '210vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative'
  };

  return (
    <div style={backgroundImageStyle} className='bg'>
      <div className="overlay">
        <h1 className='heading'>WELCOME TO ARMS</h1>
        <p>Academic Reference Management System.</p>
        {!isAuthenticated ? (
          <Link onClick={() => loginWithRedirect()} className="auth-button">
            Login or SignUp
          </Link>
        ) : (
          <Link onClick={() => logout({ returnTo: window.location.origin })} className="auth-button">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
