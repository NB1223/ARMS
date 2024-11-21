import React, { useState, useEffect } from 'react';
import './Courses.css';
import { useAuth0 } from '@auth0/auth0-react';


const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);


    const { isAuthenticated, user } = useAuth0();
    const username = user?.email?.substring(0, 13);
    const studentPattern = /^pes[12]202[23][0-9]{4}[1-9]$/;
    // srn

    useEffect(() => {
        if (isAuthenticated && username && studentPattern.test(username)) {
            // Assuming your API endpoint is `/student/{srn}` where SRN is passed as a parameter
            fetch(`http://localhost:5000/student/${username}`)
                .then(res => res.json())
                .then(data => setStudentDetails(data))
                .catch(err => console.error('Error fetching student details:', err));
        }
    }, [isAuthenticated, username]);

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

        <div className="student-container">

            {/* Display student info if available */}
            {studentDetails && (
                <div className="student-info">
                    <div className='part1'>
                        <h2 className='hi'>Hi, {studentDetails.Student_Name}</h2>
                        <p className='dept'>Department of {studentDetails.Department}</p>
                    </div>
                    <div className='part2'>
                        <p className='sem'>Semester: {studentDetails.Semester}</p>
                        <p className='srn'>SRN: {studentDetails.SRN}</p>
                    </div>
                    
                </div>
            )}

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
                            <th>Links</th>
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
                                <td><a href={topic.link} target="_blank">{topic.Title}</a></td>
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
        </div>
    );
};

export default Courses;
