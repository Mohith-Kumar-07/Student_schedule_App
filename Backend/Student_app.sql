-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: student_schedule_app
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course_details`
--

DROP TABLE IF EXISTS `course_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_details` (
  `course_id` int NOT NULL,
  `section_number` int DEFAULT NULL,
  `instructor_name` varchar(100) DEFAULT NULL,
  `student_count` int DEFAULT NULL,
  `description` text,
  `modality` enum('in-person','fully remote','hybrid flexible','Hybrid') DEFAULT NULL,
  `credits` int DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_details`
--

LOCK TABLES `course_details` WRITE;
/*!40000 ALTER TABLE `course_details` DISABLE KEYS */;
INSERT INTO `course_details` VALUES (1,1,'Dr. Ugo Etudo',25,'An introductory course on systems development.','Hybrid',3),(2,1,'Dr. Elizabeth White Baker',30,'A deep dive into information systems security.','Hybrid',3),(3,1,'Prof. Joe Cipolla',26,'Business intelligence and data analytics techniques.','Hybrid',3),(4,2,'Prof. Promod Sreedharan',14,'Understanding networking','Hybrid',3),(5,2,'Prof. Jason Merrick',25,'Solve the future problems','in-person',3),(8,2,'Dr. Paul Brooks',40,'Identify patterns and make recommendations for the best course of action.','Hybrid',3),(9,2,'Prof. Jason',26,'Business intelligence and data analytics techniques.','Hybrid',3);
/*!40000 ALTER TABLE `course_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `instructor_name` varchar(100) DEFAULT NULL,
  `credits` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_code` (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Systems Development','INFO 530','Dr. Ugo Etudo',3),(2,'Principles of Computer and Information Systems Security','INFO 544','Dr. Elizabeth White Baker',3),(3,'Information Systems for Business Intelligence','INFO 664-901','Prof. Joe Cipolla',3),(4,'Data Communications','INFO 520','Prof. Promod Sreedharan',3),(5,'Forecasting Methods','SCMA 669','Prof. Jason Merrick',3),(8,'Prescriptive Analysis','INFO 645','Dr. Paul Brooks',3),(9,'Information Systems for Business Intelligence','INFO 664-902','Prof. Jason',3);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enrollments` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `section_number` int DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `meeting_room` varchar(50) DEFAULT NULL,
  `meeting_days` varchar(20) DEFAULT NULL,
  `meeting_times` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,'V-01106540',1,1,'Fall',2024,'Room 2125','Mon/Wed','17:30 - 18:40'),(2,'V-01106540',2,1,'Fall',2024,'Room 2175','Mon/Wed','16:00 - 17:15'),(3,'V-01106540',3,2,'Fall',2024,'Room 2144','Wed','19:00 - 21:40'),(4,'V-01106540',4,1,'Fall',2024,'Room 2175','Thurs','19:00 - 21:40'),(5,'V-01107616',1,1,'Fall',2024,'Room 2125','Mon/Wed','17:30 - 18:40'),(6,'V-01107616',2,1,'Fall',2024,'Room 2175','Mon/Wed','16:00 - 17:15'),(7,'V-01107616',3,2,'Fall',2024,'Room 2144','Wed','19:00 - 21:40'),(8,'V-01107616',4,1,'Fall',2024,'Room 2175','Thurs','19:00 - 21:40'),(9,'V-01108266',1,1,'Fall',2024,'Room 2125','Mon/Wed','17:30 - 18:40'),(10,'V-01108266',2,1,'Fall',2024,'Room 2175','Mon/Wed','16:00 - 17:15'),(11,'V-01108266',5,2,'Fall',2024,'Room 2140','Wed','19:00 - 21:40'),(12,'V-01108266',4,1,'Fall',2024,'Room 2175','Thurs','19:00 - 21:40'),(13,'V-01107275',1,1,'Fall',2024,'Room 2125','Mon/Wed','17:30 - 18:40'),(14,'V-01107275',8,1,'Fall',2024,'Room 2160','Tues/Thurs','17:30 - 18:45'),(15,'V-01107275',5,2,'Fall',2024,'Room 2140','Wed','19:00 - 21:40'),(16,'V-01107275',9,1,'Fall',2024,'Room 2159','Thurs','19:00 - 21:40'),(17,'V-01107275',9,1,'Fall',2024,'Room 2159','Thurs','19:00 - 21:40');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (3,'V-01106540',1,'17:30:00','18:45:00','Monday'),(4,'V-01106540',1,'17:30:00','18:45:00','Wednesday'),(5,'V-01106540',2,'16:00:00','17:15:00','Monday'),(6,'V-01106540',2,'16:00:00','17:15:00','Wednesday'),(7,'V-01106540',3,'19:00:00','21:40:00','Wednesday'),(8,'V-01106540',4,'19:00:00','21:40:00','Thursday'),(9,'V-01107616',1,'17:30:00','18:45:00','Monday'),(10,'V-01107616',1,'17:30:00','18:45:00','Wednesday'),(11,'V-01107616',2,'16:00:00','17:15:00','Monday'),(12,'V-01107616',2,'16:00:00','17:15:00','Wednesday'),(13,'V-01107616',3,'19:00:00','21:40:00','Wednesday'),(14,'V-01107616',4,'19:00:00','21:40:00','Thursday'),(15,'V-01108266',1,'17:30:00','18:45:00','Monday'),(16,'V-01108266',1,'17:30:00','18:45:00','Wednesday'),(17,'V-01108266',2,'16:00:00','17:15:00','Monday'),(18,'V-01108266',2,'16:00:00','17:15:00','Wednesday'),(19,'V-01108266',5,'19:00:00','21:40:00','Wednesday'),(20,'V-01108266',4,'19:00:00','21:40:00','Thursday'),(21,'V-01107275',1,'17:30:00','18:45:00','Monday'),(22,'V-01107275',5,'19:00:00','21:40:00','Wednesday'),(23,'V-01107275',1,'17:30:00','18:45:00','Monday'),(24,'V-01107275',8,'17:30:00','18:45:00','Tuesday'),(25,'V-01107275',8,'17:30:00','18:45:00','Thursday'),(26,'V-01107275',9,'19:00:00','21:40:00','Thursday');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'V-01106540','Student6540','Mohith','Kumar','prasannam@vcu.edu'),(2,'V-01108266','Student8266','Ayas','Rehman','pathoora@vcu.edu'),(3,'V-01107616','Student7616','Nitheesh','M K','murugadhasan@vcu.edu'),(4,'V-01107275','Student7275','Madhumitha','Polamreddy','polamreddym@vcu.edu');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-13 12:31:52
