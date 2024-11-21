-- Add the 'access_timestamp' column

use arms;

-- ALTER TABLE accesses
-- ADD COLUMN access_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add the 'read_status' column
-- ALTER TABLE accesses
-- ADD COLUMN read_status BOOLEAN DEFAULT FALSE;

-- ALTER TABLE student
-- DROP COLUMN S_Password;

-- INSERT INTO student (SRN, Student_Name, Department, Semester)
-- VALUES
-- ('PES1202201196', 'Neha Bhaskar', 'CSE', 5);

-- INSERT INTO student (SRN, Student_Name, Department, Semester)
-- VALUES
-- ('PES1202201230', 'Nishita Gopi', 'CSE', 5);

-- ALTER TABLE professor DROP COLUMN P_Password;

-- ALTER TABLE professor ADD COLUMN Email VARCHAR(50) NOT NULL UNIQUE;

-- SELECT CONSTRAINT_NAME
-- FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
-- WHERE TABLE_NAME = 'professor' AND CONSTRAINT_TYPE = 'UNIQUE';

-- ALTER TABLE professor DROP CONSTRAINT P_Name;

-- ALTER TABLE professor MODIFY P_Name VARCHAR(30) NOT NULL;

-- DESCRIBE professor;

-- SELECT CONSTRAINT_NAME
-- FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
-- WHERE TABLE_NAME = 'professor' AND COLUMN_NAME = 'RID';

-- ALTER TABLE professor DROP FOREIGN KEY professor_ibfk_1;

-- ALTER TABLE professor DROP COLUMN RID;

-- INSERT INTO professor (PID, P_Name, Department, Email) VALUES
-- (102, 'Prof. S', 'CSE', 'nishitagopi24@gmail.com'),
-- (101, 'Prof. R', 'CSE', 'bhaskar.neha23@gmail.com');

-- INSERT INTO course (CID, course_name, Semester) VALUES
-- (1, 'SE', 5),
-- (2, 'DBMS', 5);

-- DROP TABLE teaches;

-- DROP TABLE tag;

-- DROP TABLE under;

-- DROP TABLE enrolled_in;

-- DROP TABLE bookmark;

-- ALTER TABLE course
-- ADD PID INT,
-- ADD FOREIGN KEY (PID) REFERENCES professor(PID);




