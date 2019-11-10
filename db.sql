CREATE DATABASE  IF NOT EXISTS `exl` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `exl`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: exl
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `video_link` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `course_id_idx` (`course_id`),
  CONSTRAINT `class_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (9,3,'https://www.youtube.com/','class1: Describe the city you live in',NULL,NULL),(10,3,'https://www.youtube.com/','class2: Talk about your favoriate movie',NULL,NULL),(11,3,'https://www.youtube.com','class3: What\'s your most concerns',NULL,NULL),(12,3,'https://www.youtube.com','class4: Talk about future technology trends',NULL,NULL),(13,4,'https://www.youtube.com/','class1 for business course',NULL,NULL),(14,4,'https://www.youtube.com/','class2 for business course',NULL,NULL),(15,4,'https://www.youtube.com/','class3 for business course',NULL,NULL),(16,4,'https://www.youtube.com/','class4 for business course',NULL,NULL),(17,5,'https://www.youtube.com/','class1 for interview & presentation',NULL,NULL),(18,5,'https://www.youtube.com/','class2 for interview & presentation',NULL,NULL),(19,5,'https://www.youtube.com/','class3 for interview & presentation',NULL,NULL),(20,5,'https://www.youtube.com/','class4 for interview & presentation',NULL,NULL);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(200) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (3,'TOEFL SPEAKING',25,'Top 50 TOEFL SPEAKING Q1&Q2',NULL,NULL),(4,'Basic Business English Scenario',35,'There will be questions from real English busniess Scenario and try to practice them',NULL,NULL),(5,'Interview and Prsentation',35,'Getting nervous when an interview or presentation coming? Get well practiced!',NULL,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `payment_status` varchar(45) DEFAULT NULL,
  `billing_address` varchar(250) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `payment_details` varchar(250) DEFAULT NULL,
  `tutor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `student_id_idx` (`student_id`),
  KEY `course_id_idx` (`course_id`),
  KEY `order_tutor_idx` (`tutor_id`),
  CONSTRAINT `order_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,3,'paid',NULL,NULL,NULL,1),(2,2,3,'paid',NULL,NULL,NULL,1),(3,2,4,'paid',NULL,NULL,NULL,2),(4,3,4,'paid',NULL,NULL,NULL,2),(5,4,4,'paid',NULL,NULL,NULL,2),(6,5,5,'paid',NULL,NULL,NULL,3),(7,6,5,'paid',NULL,NULL,NULL,3),(18,3,3,'paid',NULL,NULL,NULL,1),(19,3,3,'paid',NULL,NULL,NULL,1),(20,3,3,'paid',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor_id` int(11) DEFAULT NULL,
  `rating_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`rate_id`),
  KEY `rating_tutor_idx` (`tutor_id`),
  CONSTRAINT `rating_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,1,10),(2,1,8),(3,2,7),(4,2,8),(5,3,6);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recording`
--

DROP TABLE IF EXISTS `recording`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recording` (
  `recording_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `submitted_date` datetime DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `comment` varchar(45) DEFAULT 'Wait for tutor''s comment',
  `is_graded` tinyint(4) unsigned DEFAULT '0',
  `tutor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`recording_id`),
  KEY `recording_class_idx` (`class_id`),
  KEY `recording_student_idx` (`student_id`),
  KEY `recording_tutor_idx` (`tutor_id`),
  CONSTRAINT `recording_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recording_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recording_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recording`
--

LOCK TABLES `recording` WRITE;
/*!40000 ALTER TABLE `recording` DISABLE KEYS */;
INSERT INTO `recording` VALUES (1,9,1,NULL,NULL,'Hill',0,1),(2,13,2,NULL,NULL,NULL,0,2),(3,14,2,NULL,NULL,NULL,0,2),(4,15,2,NULL,NULL,NULL,1,2),(5,10,1,NULL,NULL,NULL,1,1),(6,11,1,NULL,NULL,NULL,0,1),(7,12,1,NULL,NULL,NULL,1,1),(9,9,1,NULL,'https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing',NULL,0,1),(10,9,1,NULL,'https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing',NULL,0,1),(11,9,1,NULL,'https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing',' great flow!',1,1),(12,9,1,NULL,' https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing','Wait for tutor\'s comment',0,1),(13,9,1,NULL,'  https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing','Wait for tutor\'s comment',0,1),(14,9,1,NULL,'  https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing','Wait for tutor\'s comment',0,1),(15,9,1,NULL,'   https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing','Wait for tutor\'s comment',0,1),(16,9,1,NULL,'    https://docs.google.com/presentation/d/1pGubTJSWxZi-i_K8c8IyvlRus2ZhnBOPXJOnSdsvGzo/edit?usp=sharing','  great flow!',1,1);
/*!40000 ALTER TABLE `recording` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `native_language` varchar(45) DEFAULT NULL,
  `language_to_learn` varchar(45) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Mary','Wang','Chinese','English','entry-level',NULL,NULL,'stu123@gmail.com','stu123'),(2,'Stan','Lee','Chinese','English','entry-level',NULL,NULL,'stu2@gmail.com','stu2'),(3,'Bruce','Fang','Chinese','English','entry-level',NULL,NULL,'stu3@gmail.com','stu3'),(4,'Wang','Gong','Chinese','English','entry-level',NULL,NULL,'stu4@gmail.com','stu4'),(5,'San','Zhang','Chinese','English','entry-level',NULL,NULL,'stu5@gmail.com','stu5'),(6,'Si','Lee','Chinese','English','entry-level',NULL,NULL,'stu6@gmail.com','stu6');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `tutor_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `language_to_teach` varchar(45) DEFAULT NULL,
  `native_language` varchar(45) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `teaching_experience` varchar(250) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`tutor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (1,'Ruoyi','Fan','English','English','native','3years experience',NULL,NULL,'123@sv.cmu.edu','1234'),(2,'Zuotian','Lee','English','Chinese','proficient','5 years experience',NULL,NULL,'12345@sv.cmu.edu','12345'),(3,'Sri','Sri','English','Indian','proficient','10 years experience',NULL,NULL,'sri123@sv.cmu.edu','sri123');
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_courses`
--

DROP TABLE IF EXISTS `tutor_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` varchar(45) DEFAULT NULL,
  `tutor_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_courses`
--

LOCK TABLES `tutor_courses` WRITE;
/*!40000 ALTER TABLE `tutor_courses` DISABLE KEYS */;
INSERT INTO `tutor_courses` VALUES (1,'3','2'),(2,'3','1'),(3,'3','1'),(4,'3','1'),(5,'4','1');
/*!40000 ALTER TABLE `tutor_courses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-04 23:27:39
