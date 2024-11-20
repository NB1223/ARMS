require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Setup MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Fetch topics based on course and unit
app.get('/topics', (req, res) => {
    const { course, unit } = req.query;
    let query = 'SELECT * FROM resources';
    const queryParams = [];

    if (course && unit) {
        query += ' WHERE course = ? AND unit = ?';
        queryParams.push(course, unit);
    } else if (course) {
        query += ' WHERE course = ?';
        queryParams.push(course);
    } else if (unit) {
        query += ' WHERE unit = ?';
        queryParams.push(unit);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching topics:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

app.get('/teacher_courses', (req, res) => {
    const { course, unit } = req.query;
    
    // Base query
    let query = 'SELECT * FROM resources';
    const queryParams = [];

    // Add conditions based on course and unit
    if (course && unit) {
        query += ' WHERE course = ? AND unit = ?';
        queryParams.push(course, unit);
    } else if (course) {
        query += ' WHERE course = ?';
        queryParams.push(course);
    } else if (unit) {
        query += ' WHERE unit = ?';
        queryParams.push(unit);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching topics:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);  // Send the topics data back as JSON
    });
});

app.get('/student/:srn', (req, res) => {
    const srn = req.params.srn;
    
    // Query to fetch student details from the database
    const query = 'SELECT * FROM student WHERE SRN = ?';
    db.query(query, [srn], (err, result) => {
        if (err) {
            console.error('Error fetching student details:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Send student details back in response
        res.json(result[0]);
    });
});

app.post('/add-topic', (req, res) => {
    const { rid, title, description, course, unit, resourceType } = req.body;

    // Check if RID is unique
    const checkQuery = 'SELECT * FROM resources WHERE RID = ?';
    db.query(checkQuery, [rid], (err, result) => {
        if (err) {
            console.error('Error checking RID:', err);
            return res.status(500).send('Server error');
        }

        // If RID exists, return an error message
        if (result.length > 0) {
            return res.status(400).json({ error: 'RID must be unique' });
        }

        // If RID is unique, insert new topic
        const query = 'INSERT INTO resources (RID, Title, Descriptions, course, unit, resource_type) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [rid, title, description, course, unit, resourceType], (err, result) => {
            if (err) {
                console.error('Error adding new topic:', err);
                return res.status(500).send('Server error');
            }

            // Respond with the newly added topic
            res.status(201).json({
                RID: rid,
                Title: title,
                Descriptions: description,
                course: course,
                unit: unit,
                resource_type: resourceType,
                status: false // default status
            });
        });
    });
});


// Update read status
app.put('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE resources SET status = ? WHERE RID = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            res.status(500).send('Server error');
        } else {
            res.json({ message: 'Status updated successfully' });
        }
    });
});

app.post('/upload-resource', (req, res) => {
    const { rid, link } = req.body;

    if (!link) {
        return res.status(400).send('Link is required');
    }

    const query = 'UPDATE resources SET link = ? WHERE RID = ?';
    db.query(query, [link, rid], (err, result) => {
        if (err) {
            console.error('Error uploading link:', err);
            return res.status(500).send('Server error');
        }
        res.send('Link uploaded successfully');
    });
});

app.post('/add-link', (req, res) => {
    const { rid, link } = req.body;
    const query = 'UPDATE resources SET link = ? WHERE RID = ?';
    
    db.query(query, [link, rid], (err, result) => {
        if (err) {
            console.error('Error adding link:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).json({ message: 'Link added successfully' });
    });
});


app.put('/update-link/:id', (req, res) => {
    const { id } = req.params;
    const { link } = req.body;

    const query = 'UPDATE resources SET link = ? WHERE RID = ?';
    db.query(query, [link, id], (err, result) => {
        if (err) {
            console.error('Error updating link:', err);
            res.status(500).send('Server error');
        } else {
            res.json({ message: 'Link updated successfully' });
        }
    });
});




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
