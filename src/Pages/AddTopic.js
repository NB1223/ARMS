import React, { useState } from 'react';
import './AddTopic.css';
import { useNavigate } from 'react-router-dom';

const AddTopic = () => {
    const [newTopic, setNewTopic] = useState({
        rid: '',
        title: '',
        description: '',
        course: '',
        unit: '',
        resourceType: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTopic((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/add_topic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTopic)
        })
        .then(response => response.json())
        .then(() => {
            alert('New topic added successfully!');
            navigate('/');
        })
        .catch(() => alert('Failed to add topic.'));
    };

    return (
        <div className="add-topic-container">
            <h2>Add New Topic</h2>
            <form onSubmit={handleSubmit} className="add-topic-form">
                <input type="number" name="rid" placeholder="RID" onChange={handleChange} required />
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
                <select name="course" onChange={handleChange} required>
                    <option value="">Select Course</option>
                    <option value="SE">Software Engineering</option>
                    <option value="DBMS">Database Management Systems</option>
                </select>
                <select name="unit" onChange={handleChange} required>
                    <option value="">Select Unit</option>
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                </select>
                <select name="resourceType" onChange={handleChange} required>
                    <option value="">Select Resource Type</option>
                    <option value="Video">Video</option>
                    <option value="Article">Article</option>
                    <option value="Course">Course</option>
                    <option value="E-Book">E-Book</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddTopic;
