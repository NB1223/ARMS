import React, { useState, useEffect } from 'react';
import './Teacher_courses.css';
import { useAuth0 } from '@auth0/auth0-react';

const TeacherCourses = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [link, setLink] = useState('');

    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            const email = user.email; // Assuming the user object contains the logged-in professor's email
    
            let url = `http://localhost:5000/teacher_courses?email=${email}`;
            
            if (selectedCourse) {
                url += `&course=${selectedCourse}`;
            }
            if (selectedUnit) {
                url += `&unit=${selectedUnit}`;
            }
    
            fetch(url)
                .then((res) => res.json())
                .then((data) => setTopics(data))  // Update state with the fetched topics
                .catch((err) => console.error('Error fetching topics:', err));  // Error handling
        }
    }, [isAuthenticated, user, selectedCourse, selectedUnit]);
    

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

                // Update the topic with the new link in the state
                setTopics((prevTopics) =>
                    prevTopics.map((topic) =>
                        topic.RID === selectedTopic.RID ? { ...topic, link: link } : topic
                    )
                );
            } else {
                alert('Error uploading link');
            }
        } catch (error) {
            console.error('Error uploading link:', error);
        }
    };

    const courseName = [...new Set(topics.map(topic => topic.course))];
    // console.log("------------",courseNames)

    const courseMap = {
        SE: "Software Engineering",
        DBMS: "Database Management Systems",
        // Add more course mappings if needed
    };

    const displayCourseName = courseMap[courseName];

    return (
        <div className="teacher-courses-container">
            {/* Course selection buttons */}
            <div className="course-selection">
                <h3>{displayCourseName}</h3>
            </div>

            {/* <h3>{courseNames} - {selectedUnit}</h3> */}
            
            {/* Topics table */}
            <table className="table-striped">
                <thead>
                    <tr>
                    {/* r.Descriptions,  */}
                    {/* r.resource_type,  */}
                        <th>Index</th>
                        <th>ID</th>
                        <th>Unit</th>
                        <th>Topic Name</th>
                        {/* <th>Description</th> */}
                        <th>Resources</th>
                        <th>Resource Type</th>
                        <th>Link</th>
                        <th>Views</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, index) => (
                        <tr key={topic.RID}>
                            <td>{index + 1}</td>
                            <td>{topic.course}{topic.RID}</td>
                            <td>{topic.unit}</td>
                            <td>{topic.Title}</td>
                            {/* <td>{topic.Descriptions}</td> */}
                            <td>
                                <button onClick={() => handleUploadClick(topic)}>
                                    {topic.link ? 'Update Link' : 'Upload Link'}
                                </button>
                            </td>
                            <td>{topic.link ? (
                                <a href={topic.link} target="_blank" rel="noopener noreferrer">
                                {topic.Title}
                                </a>
                            ) : (
                                'No link available'
                            )}
                            </td>
                            <td>{topic.resource_type}</td>
                            <td>{topic.view_count}</td>
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
