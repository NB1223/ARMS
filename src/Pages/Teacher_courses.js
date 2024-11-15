import React, { useState, useEffect } from 'react';
import './Teacher_courses.css';
// import { Link, Navigate } from 'react-router-dom';
// import AddTopic from './AddTopic.js';

const TeacherCourses = () => {
    // const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);

    // Fetch topics based on selected course and unit
    useEffect(() => {
        let url = 'http://localhost:5000/teacher_courses';
        if (selectedCourse) {
            url += `?course=${selectedCourse}`;
        }
        if (selectedUnit) {
            url += selectedCourse ? `&unit=${selectedUnit}` : `?unit=${selectedUnit}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setTopics(data))
            .catch(err => console.error('Error fetching topics:', err));
    }, [selectedCourse, selectedUnit]);

    // Handle upload button click
    const handleUploadClick = (topic) => {
        alert(`Upload resources for ${topic.Title}`);
    };

    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     navigate('/add_topic')
    // }

    return (
        <div className="teacher-courses-container">
            <div className="course-selection">
                <button onClick={() => setSelectedCourse('SE')}>Software Engineering</button>
                <button onClick={() => setSelectedCourse('DBMS')}>Database Management Systems</button>
                <button onClick={() => { setSelectedCourse(''); setSelectedUnit(''); }}>Clear Course</button>
            </div>
            <div className="unit-buttons">
                <button onClick={() => setSelectedUnit('1')}>Unit 1</button>
                <button onClick={() => setSelectedUnit('2')}>Unit 2</button>
            </div>
            <h3>{selectedCourse ? `${selectedCourse} Topics` : 'All Courses'} - {selectedUnit || 'All Units'}</h3>
            <table className="table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Topic Name</th>
                        <th>Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, index) => (
                        <tr key={topic.RID}>
                            <td>{index + 1}</td>
                            <td>{topic.Title}</td>
                            <td>
                                <button onClick={() => handleUploadClick(topic)}>Upload Resources</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default TeacherCourses;
