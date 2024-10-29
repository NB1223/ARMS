import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Courses from './Pages/Courses.js';
import NavbarComponent from './Components/NavBar.js';

function App() {
  return (
    <div className='app-div'>
      <Router>
        <NavbarComponent/>
        <Routes>
          <Route  path='/' element={<Home />} ></Route>
          <Route  path='/Login' element={<Login/>} ></Route>
          <Route  path='/Courses' element={<Courses/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
