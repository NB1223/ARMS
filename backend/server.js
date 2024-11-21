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

// app.get('/teacher_courses', (req, res) => {
//     const { course, unit } = req.query;
    
//     // Base query
//     let query = 'SELECT * FROM resources';
//     const queryParams = [];

//     // Add conditions based on course and unit
//     if (course && unit) {
//         query += ' WHERE course = ? AND unit = ?';
//         queryParams.push(course, unit);
//     } else if (course) {
//         query += ' WHERE course = ?';
//         queryParams.push(course);
//     } else if (unit) {
//         query += ' WHERE unit = ?';
//         queryParams.push(unit);
//     }

//     db.query(query, queryParams, (err, results) => {
//         if (err) {
//             console.error('Error fetching topics:', err);
//             return res.status(500).send('Server error');
//         }
//         res.json(results);  // Send the topics data back as JSON
//     });
// });

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


// Update read status
app.put('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE accesses SET read_status = ? WHERE RID = ? and srn=?';
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

app.get('/teacher_courses', (req, res) => {
    const { email } = req.query; // Assuming the email of the professor is passed in the query

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const query = `
        SELECT 
            r.RID, 
            r.course,
            r.Title, 
            r.Descriptions, 
            r.resource_type, 
            r.unit, 
            r.view_count, 
            r.link,
            c.course_name
        FROM resources r
        JOIN course c ON c.course_name = r.course
        WHERE c.PID = (SELECT PID FROM professor WHERE Email = ?) ORDER BY r.unit;

    `;

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('Server error');
        }
        res.json(results); // Send the filtered topics to the frontend
    });
});

// Create a new resource

app.post('/create-resource', (req, res) => {
    const { rid, course, unit, title, description, resource_type, view_count } = req.body;
    console.log(req.body)

    const query = `
        INSERT INTO resources (rid, course, unit, Title, Descriptions, resource_type, view_count)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [rid, course, unit, title, description, resource_type, view_count], (err, result) => {
        if (err) {
            console.error('Error creating resource:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Resource created successfully');
    });
});

// Delete a resource
app.delete('/delete-resource/:id', (req, res) => {
    const { id } = req.params;  // The id is passed in the URL to specify which resource to delete

    const query = 'DELETE FROM resources WHERE RID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting resource:', err);
            return res.status(500).send('Server error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Resource not found');
        }
        res.send('Resource deleted successfully');
    });
});


// Fetch all resources
app.get('/resources', (req, res) => {
    const query = 'SELECT * FROM resources';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching resources:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);  // Send the list of resources
    });
});





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
