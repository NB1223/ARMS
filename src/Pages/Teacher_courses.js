import React, { useState, useEffect } from 'react';
import './Teacher_courses.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const TeacherCourses = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [topics, setTopics] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [link, setLink] = useState('');
    const [resources, setResources] = useState([]);
    const [selectedRID, setSelectedRID] = useState('');
    const [unitViews, setUnitViews] = useState([]);

    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

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
    
    const courseName = [...new Set(topics.map(topic => topic.course))];
    useEffect(() => {
        // Fetch all resources from the backend to populate the dropdown
        fetch('http://localhost:5000/resources')  // Adjust the URL if needed
            .then((response) => response.json())
            .then((data) => setResources(data))
            .catch((error) => console.error('Error fetching resources:', error));
    }, []);

    useEffect(() => {
        const fetchUnitViews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/course-unit-views?course=${courseName}`);
                
                // Check if the response is ok (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setUnitViews(data);
            } catch (error) {
                console.error('Error fetching unit views:', error);
            }
        };
    
        if (courseName) {
            fetchUnitViews();
        }
    }, [courseName]);
    

    const handleDelete = () => {
        if (!selectedRID) {
            alert('Please select a resource to delete');
            return;
        }

        // Send a DELETE request to the server
        fetch(`http://localhost:5000/delete-resource/${selectedRID}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Resource deleted successfully');
                    // Update the UI to remove the deleted resource
                    setResources(resources.filter((resource) => resource.RID !== selectedRID));
                } else {
                    alert('Error deleting resource');
                }
            })
            .catch((error) => {
                console.error('Error deleting resource:', error);
                alert('Error deleting resource');
            });
    };

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

    

    // console.log("------------",courseNames)

    const courseMap = {
        SE: "Software Engineering",
        DBMS: "Database Management Systems",
        // Add more course mappings if needed
    };

    const handleCreateResource = () => {
        navigate('/create-resource'); // Navigate to the "Create Resource" page
    };

    const displayCourseName = courseMap[courseName];

    return (
        <div className="teacher-courses-container">
            {/* Course selection buttons */}
            <div className="course-selection">
                <h3 className='course_name'>{displayCourseName}</h3>
            </div>
            <button className='handle_resource' onClick={handleCreateResource}>Create Resource</button>

            <div className='delete_resource'>
                <h2>Delete a Resource - Please Refresh After Deletion!</h2>
                <select
                    value={selectedRID}
                    onChange={(e) => setSelectedRID(e.target.value)}>
                    <option value="">Select a resource to delete</option>
                    {resources.map((resource) => (
                        <option key={resource.RID} value={resource.RID}>
                            {resource.Title} (ID: {resource.RID})
                        </option>
                    ))}
                </select>
                <button onClick={handleDelete}>Delete Resource</button>
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

            <div className="unit-views-container">
                <h3 className='view_count'>Total Views Per Unit for {selectedCourse}</h3>
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Total Views</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unitViews.map((unit) => (
                            <tr key={unit.unit}>
                                <td>{unit.unit}</td>
                                <td>{unit.total_views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default TeacherCourses;
