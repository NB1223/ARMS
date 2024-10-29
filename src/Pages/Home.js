// src/Home.js
import React from 'react';
import BG_image from '../images/BG_image.jpg'; 
import './Home.css';

function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${BG_image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '88.8vh',
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
        <p>Get started today.</p>
      </div>
    </div>
  );
}

export default Home;
