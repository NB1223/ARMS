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
    Title VARCHAR(30) NOT NULL UNIQUE,
    Descriptions VARCHAR(30) NOT NULL,
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
