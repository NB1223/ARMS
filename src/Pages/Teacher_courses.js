import React, { useState, useEffect } from 'react';
import './Teacher_courses.css';

const TeacherCourses = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [link, setLink] = useState('');

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

    // Handle upload/update button click
    const handleUploadClick = (topic) => {
        setSelectedTopic(topic);
        setLink(topic.link || ''); // Pre-fill link if it exists
        setShowUploadModal(true);
    };

    // Handle form submission for uploading/updating link
    const handleUploadSubmit = async (e) => {
        e.preventDefault();

        if (!link) {
            alert('Please enter a link');
            return;
        }

        const data = {
            rid: selectedTopic.RID,
            link: link
        };

        try {
            const response = await fetch('http://localhost:5000/upload-resource', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Link uploaded/updated successfully!');
                setShowUploadModal(false);
                setLink('');

                // Refresh topics list after upload
                fetch('http://localhost:5000/teacher_courses')
                    .then(res => res.json())
                    .then(data => setTopics(data))
                    .catch(err => console.error('Error refreshing topics:', err));
            } else {
                alert('Error uploading link');
            }
        } catch (error) {
            console.error('Error uploading link:', error);
        }
    };

    return (
        <div className="teacher-courses-container">
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

            <h3>{selectedCourse ? `${selectedCourse} Topics` : 'All Courses'} - {selectedUnit || 'All Units'}</h3>
            
            {/* Topics table */}
            <table className="table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Topic Name</th>
                        <th>Resources</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, index) => (
                        <tr key={topic.RID}>
                            <td>{index + 1}</td>
                            <td>{topic.Title}</td>
                            <td>
                                <button onClick={() => handleUploadClick(topic)}>
                                    {topic.link ? 'Update Link' : 'Upload Link'}
                                </button>
                            </td>
                            <td>{topic.link || 'No link available'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Upload/Update Modal */}
            {showUploadModal && (
                <div className="upload-modal">
                    <h3>{selectedTopic.link ? 'Update Link' : 'Upload Link'} for {selectedTopic.Title}</h3>
                    <form onSubmit={handleUploadSubmit}>
                        <input
                            type="text"
                            placeholder="Enter resource link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <button type="submit">{selectedTopic.link ? 'Update' : 'Upload'}</button>
                        <button type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
