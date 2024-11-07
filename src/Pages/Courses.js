import React, { useState } from 'react';
import './Courses.css';
import { useAuth0 } from '@auth0/auth0-react';

const coursesData = {
    Math: {
        Unit1: ['Algebra', 'Geometry'],
        Unit2: ['Calculus', 'Statistics']
    },
    Science: {
        Unit1: ['Physics', 'Chemistry'],
        Unit2: ['Biology', 'Earth Science']
    }
};

const Courses = () => {

    const { isAuthenticated, user } = useAuth0();

    // Extract the first 14 characters of the email as username
    const username = user?.email?.substring(0, 13);
    console.log("Username:", username);

    const initialCourse = Object.keys(coursesData)[0];
    const [selectedCourse, setSelectedCourse] = useState(initialCourse);
    const [selectedUnit, setSelectedUnit] = useState({ Math: 'Unit1', Science: 'Unit1' });
    const [readStatus, setReadStatus] = useState({});

    const handleCourseClick = (course) => {
        if (selectedCourse !== course) {
            setSelectedCourse(course);
        }
        // No action is taken if the course clicked is already the selected one
    };

    const handleCheckboxChange = (course, topic) => {
        setReadStatus((prevStatus) => ({
            ...prevStatus,
            [course]: {
                ...prevStatus[course],
                [topic]: !prevStatus[course]?.[topic]
            }
        }));
    };

    const handleUnitChange = (course, unit) => {
        setSelectedUnit((prevUnits) => ({
            ...prevUnits,
            [course]: unit
        }));
    };

    return (
        <div className="courses-container">
            {/* Div for Course Buttons */}
            <div className="course-list">
                {Object.keys(coursesData).map((course) => (
                    <button
                        key={course}
                        className="course-btn"
                        onClick={() => handleCourseClick(course)}
                    >
                        {course}
                    </button>
                ))}
            </div>

            {/* Div for Topics and Unit Buttons */}
            <div className="topics">
                {selectedCourse && (
                    <>
                        <div className="unit-buttons">
                            <button onClick={() => handleUnitChange(selectedCourse, 'Unit1')}>
                                {selectedCourse} Unit 1
                            </button>
                            <button onClick={() => handleUnitChange(selectedCourse, 'Unit2')}>
                                {selectedCourse} Unit 2
                            </button>
                        </div>

                        <h3 className="text-center">{selectedCourse} Topics - {selectedUnit[selectedCourse]}</h3>
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Topic Name</th>
                                    <th>Read</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesData[selectedCourse][selectedUnit[selectedCourse]].map((topic, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{topic}</td>
                                        <td>
                                            <input id="check"
                                                type="checkbox"
                                                checked={readStatus[selectedCourse]?.[topic] || false}
                                                onChange={() => handleCheckboxChange(selectedCourse, topic)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Courses;
