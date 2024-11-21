import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateResource = () => {
    const [rid, setRid] = useState('');
    const [course, setCourse] = useState('');
    const [unit, setUnit] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [resourceType, setResourceType] = useState('');
    // const [viewCount, setViewCount] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newResource = {
            rid: rid,
            course,
            unit,
            title,
            description,
            resource_type: resourceType,
            view_count: 0,
        };

        try {
            const response = await fetch('http://localhost:5000/create-resource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newResource),
            });
            // console.log(newResource)

            if (response.ok) {
                alert('Resource created successfully!');
                navigate('/teacher_courses'); // Navigate back to the teacher's course list
            } else {
                alert('Error creating resource');
            }
        } catch (error) {
            console.error('Error creating resource:', error);
        }
    };

    return (
        <div className="create-resource-container">
            <h3>Create New Resource</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>RID:</label>
                    <input
                        type="number"
                        value={rid}
                        onChange={(e) => setRid(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Course:</label>
                    <select
                        value={course}
                        onChange={(e) => setResourceType(e.target.value)}
                        required>
                        <option value="">Select Course</option>
                        <option value="DBMS">DBMS</option>
                        <option value="SE">SE</option>
                    </select>
                </div>
                <div>
                    <label>Unit:</label>
                    <input
                        type="number"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Resource Type:</label>
                    <select
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                        required>
                        <option value="">Select Resource Type</option>
                        <option value="Paper">Paper</option>
                        <option value="Article">Article</option>
                        <option value="Video">Video</option>
                        <option value="Slides">Slides</option>
                        <option value="Textbook">Textbook</option>
                    </select>
                </div>


                <button type="submit">Submit</button>
                <button type="button" onClick={() => navigate('/teacher_courses')}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateResource;
