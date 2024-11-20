CREATE DATABASE IF NOT EXISTS arms;

USE arms;

CREATE TABLE IF NOT EXISTS student (
    SRN VARCHAR(15) PRIMARY KEY,
    Student_Name VARCHAR(30) NOT NULL UNIQUE,
    Department VARCHAR(10) NOT NULL,
    Semester INT NOT NULL,
    S_Password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
    RID INT PRIMARY KEY,
    course VARCHAR(40) NOT NULL,
    Title VARCHAR(50) NOT NULL UNIQUE,
    Descriptions VARCHAR(60) NOT NULL,
    resource_type VARCHAR(20) NOT NULL,
    unit INT NOT NULL,
    view_count INT NOT NULL
);

CREATE TABLE IF NOT EXISTS professor (
    PID INT,
    RID INT,
    P_Name VARCHAR(30) NOT NULL UNIQUE,
    Department VARCHAR(10) NOT NULL,
    P_Password VARCHAR(20) NOT NULL,
    PRIMARY KEY (PID, RID),
    FOREIGN KEY (RID) REFERENCES resources(RID)
);

CREATE TABLE IF NOT EXISTS course (
    CID INT PRIMARY KEY,
    course_name VARCHAR(20) NOT NULL UNIQUE,
    Semester INT NOT NULL
);

CREATE TABLE IF NOT EXISTS saved_as (
    RID INT PRIMARY KEY,
    FOREIGN KEY (RID) REFERENCES resources(RID)
);

CREATE TABLE IF NOT EXISTS bookmark (
    RID INT,
    SRN VARCHAR(15),
    PRIMARY KEY (RID, SRN),
    FOREIGN KEY (RID) REFERENCES saved_as(RID),
    FOREIGN KEY (SRN) REFERENCES student(SRN)
);

CREATE TABLE IF NOT EXISTS teaches (
    PID INT,
    CID INT,
    PRIMARY KEY (PID, CID),
    FOREIGN KEY (PID) REFERENCES professor(PID),
    FOREIGN KEY (CID) REFERENCES course(CID)
);

CREATE TABLE IF NOT EXISTS enrolled_in (
    SRN VARCHAR(15),
    CID INT,
    PRIMARY KEY (SRN, CID),
    FOREIGN KEY (SRN) REFERENCES student(SRN),
    FOREIGN KEY (CID) REFERENCES course(CID)
);

CREATE TABLE IF NOT EXISTS accesses (
    SRN VARCHAR(15),
    RID INT,
    PRIMARY KEY (SRN, RID),
    FOREIGN KEY (SRN) REFERENCES student(SRN),
    FOREIGN KEY (RID) REFERENCES resources(RID)
);

CREATE TABLE IF NOT EXISTS under (
    RID INT PRIMARY KEY,
    FOREIGN KEY (RID) REFERENCES resources(RID)
);

CREATE TABLE IF NOT EXISTS tag (
    tag_name VARCHAR(20) NOT NULL,
    RID INT NOT NULL,
    CID INT NOT NULL,
    PRIMARY KEY (tag_name, RID, CID),
    FOREIGN KEY (RID) REFERENCES under(RID),
    FOREIGN KEY (CID) REFERENCES course(CID)
);

-- Add the 'access_timestamp' column

-- use arms;

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