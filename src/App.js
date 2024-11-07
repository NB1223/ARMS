// import React from 'react';
// import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import Home from './Pages/Home.js';
// import Courses from './Pages/Courses.js';
// import Teacher_courses from './Pages/Teacher_courses.js';
// import NavbarComponent from './Components/NavBar.js';


// function App() {
//   const { isAuthenticated } = useAuth0();

//   return (
//     <div className='app-div'>
//       <Router>
//         {isAuthenticated && <NavbarComponent />}
        
//         <Routes>
//           <Route path="/" element={isAuthenticated ? <Navigate to="/courses" /> : <Home />} />

//           <Route path="/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/" />} />
//         </Routes>

//         {/* {isAuthenticated && <footer>Footer Content</footer>} */}
//       </Router>
//     </div>
//   );
// }
// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './Pages/Home.js';
import Courses from './Pages/Courses.js';
import Teacher_courses from './Pages/Teacher_courses.js';
import NavbarComponent from './Components/NavBar.js';

function App() {
  const { isAuthenticated, user } = useAuth0();
  const username = user?.email?.substring(0, 13);
  const studentPattern = /^pes[12]202[23][0-9]{4}[1-9]$/;

  return (
    <div className='app-div'>
      <Router>
        {isAuthenticated && <NavbarComponent />}

        <Routes>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

