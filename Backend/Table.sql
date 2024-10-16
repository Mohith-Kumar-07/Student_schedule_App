CREATE DATABASE student_schedule_app;
USE student_schedule_app;
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL UNIQUE,  -- V-XXXXXXXX format
  password VARCHAR(255) NOT NULL,  -- Hashed password
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  course_code VARCHAR(20) NOT NULL UNIQUE,  -- e.g., CS101
  instructor_name VARCHAR(100),
  credits INT
  );

CREATE TABLE schedules (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50),  -- Foreign key to students table
  course_id INT,           -- Foreign key to courses table
  start_time TIME,          -- Class start time
  end_time TIME,            -- Class end time
  day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students (student_id, password, first_name, last_name, email)
VALUES 
('V-01106540', 'Student6540', 'Mohith', 'Kumar', 'prasannam@vcu.edu'),
('V-01108266', 'Student8266', 'Ayas', 'Rehman', 'pathoora@vcu.edu'),
('V-01107616', 'Student7616', 'Nitheesh', 'M K', 'murugadhasan@vcu.edu'),
('V-01107275', 'Student7275', 'Madhumitha', 'Polamreddy', 'polamreddym@vcu.edu');

SELECT * from STUDENTS;

INSERT INTO courses (course_name, course_code, instructor_name, credits)
VALUES 
('Systems Development', 'INFO 530', 'Dr. Ugo Etudo', 3),
('Principles of Computer and Information Systems Security', 'INFO 544', 'Dr. Elizabeth White Baker', 3),
('Information Systems for Business Intelligence', 'INFO 664', 'Prof. Joe Cipolla', 3),
('Data Communications', 'INFO 520', 'Prof. Promod Sreedharan', 3);
