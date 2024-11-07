import React, { useState } from 'react';
import './Teacher_courses.css';
import { useAuth0 } from '@auth0/auth0-react';

const coursesData = {
    Math: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
    Science: ['Physics', 'Chemistry', 'Biology', 'Earth Science']
};

const Teacher_courses = () => {

    const { isAuthenticated, user } = useAuth0();
    const username = user?.email?.substring(0, 13);
    console.log("Username:", username);

    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseClick = (course) => {
        setSelectedCourse(course === selectedCourse ? null : course);
    };

    const handleUploadClick = (topic) => {
        alert(`Upload resources for ${topic}`);
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

            {/* Div for Topics Table */}
            <div className="topics">
                {selectedCourse && (
                    <>
                        <h3 className="text-center">{selectedCourse} Topics</h3>
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Topic Name</th>
                                    <th>Resources</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesData[selectedCourse].map((topic, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{topic}</td>
                                        <td>
                                            <div className="upload-btn-container">
                                                <button
                                                    className="upload-btn"
                                                    onClick={() => handleUploadClick(topic)}
                                                >
                                                    Upload Resources
                                                </button>
                                            </div>
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

export default Teacher_courses;
