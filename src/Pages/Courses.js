import React, { useState } from 'react';
import './Courses.css';

const coursesData = {
    Math: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
    Science: ['Physics', 'Chemistry', 'Biology', 'Earth Science']
};

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [readStatus, setReadStatus] = useState({});

    const handleCourseClick = (course) => {
        setSelectedCourse(course === selectedCourse ? null : course);
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
                                    <th>Read</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesData[selectedCourse].map((topic, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{topic}</td>
                                        <td>
                                            <input
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
