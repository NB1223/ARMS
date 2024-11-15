import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);

    // Fetch topics based on selected course and unit
    useEffect(() => {
        let url = 'http://localhost:5000/topics';
        
        // Only add query parameters if they are selected
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

    // Handle read status change
    const handleCheckboxChange = (id, currentStatus) => {
        const newStatus = !currentStatus;
        fetch(`http://localhost:5000/update-status/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        .then(() => {
            setTopics(topics.map(topic => topic.RID === id ? { ...topic, status: newStatus } : topic));
        })
        .catch(err => console.error('Error updating status:', err));
    };

    return (
        <div className="courses-container">
            {/* Course selection buttons */}
            <div className="course-selection">
                <button onClick={() => setSelectedCourse('SE')}>Software Engineering</button>
                <button onClick={() => setSelectedCourse('DBMS')}>Database Management Systems</button>
                <button onClick={() => { setSelectedCourse(''); setSelectedUnit(''); }}>Clear Course</button>
            </div>

            {/* Unit selection buttons */}
            <div className="unit-buttons">
                <button onClick={() => setSelectedUnit('1')}>Unit 1</button>
                <button onClick={() => setSelectedUnit('2')}>Unit 2</button>
            </div>

            {/* Display resources */}
            <h3>{selectedCourse ? `${selectedCourse} Topics` : 'All Courses'} - Unit {selectedUnit || 'All Units'}</h3>
            <table className="table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Views</th>
                        <th>Read</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, index) => (
                        <tr key={topic.RID}>
                            <td>{index + 1}</td>
                            <td>{topic.Title}</td>
                            <td>{topic.Descriptions}</td>
                            <td>{topic.resource_type}</td>
                            <td>{topic.view_count}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={topic.status}
                                    onChange={() => handleCheckboxChange(topic.RID, topic.status)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
