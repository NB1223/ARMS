import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './Pages/Home.js';
import Courses from './Pages/Courses.js';
import Teacher_courses from './Pages/Teacher_courses.js';
import NavbarComponent from './Components/NavBar.js';
import CreateResource from './Pages/CreateResource.js';
// import AddTopic from './Pages/AddTopic.js';

function App() {
  const { isAuthenticated, user } = useAuth0();
  const username = user?.email?.substring(0, 13);
  const studentPattern = /^pes[12]202[23][0-9]{5}$/;

  return (
    <div className='app-div'>
      <Router>
        {isAuthenticated && <NavbarComponent />}

        <Routes>
          <Route path="/create-resource" element={<CreateResource />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                studentPattern.test(username) ? (
                  <Navigate to="/courses" />
                ) : (
                  <Navigate to="/teacher_courses" />
                )
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/courses"
            element={isAuthenticated ? <Courses /> : <Navigate to="/" />}
          />
          <Route
            path="/teacher_courses"
            element={isAuthenticated ? <Teacher_courses /> : <Navigate to="/" />}
          />
          {/* <Route path='/add_topic' element={<AddTopic/>} ></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

