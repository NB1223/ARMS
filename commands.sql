CREATE TABLE links_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    link VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE
);


INSERT INTO links_table (course, name, unit, link, status) 
VALUES 
-- Math Course Entries
('Math', 'Algebra Basics', 'Unit1', 'https://example.com/algebra', FALSE),
('Math', 'Geometry Concepts', 'Unit1', 'https://example.com/geometry', TRUE),
('Math', 'Calculus Introduction', 'Unit2', 'https://example.com/calculus', FALSE),
('Math', 'Statistics Fundamentals', 'Unit2', 'https://example.com/statistics', TRUE),

-- Science Course Entries
('Science', 'Physics Laws', 'Unit1', 'https://example.com/physics', FALSE),
('Science', 'Introduction to Chemistry', 'Unit1', 'https://example.com/chemistry', TRUE),
('Science', 'Biology Basics', 'Unit2', 'https://example.com/biology', FALSE),
('Science', 'Earth Science Overview', 'Unit2', 'https://example.com/earthscience', TRUE);


SELECT * FROM links_table;
