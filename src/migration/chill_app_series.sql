-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: chill_app
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `badge` json DEFAULT NULL,
  `desc` text,
  `duration` varchar(50) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES ('550e8400-e29b-41d4-a716-446655440000','Ted Lasso','/images/image 233.png',NULL,'American sports comedy-drama television series.','30m/ep',4.8),('62e5587f-0ad3-11f1-840d-40c2ba7c15c9','All of us Are Dead','/images/image 223.png','{\"text\": \"Episode Baru\", \"type\": \"episode\"}','Deskripsi All of us Are Dead','60m/ep',4.7),('62e55bb6-0ad3-11f1-840d-40c2ba7c15c9','Blue Lock','/images/Blue Lock.png','{\"text\": \"Episode Baru\", \"type\": \"episode\"}','Deskripsi Blue Lock','24m/ep',4.6),('62e55d0e-0ad3-11f1-840d-40c2ba7c15c9','Duty After School','/images/image 222.png','{\"text\": \"Episode Baru\", \"type\": \"episode\"}','Deskripsi Duty After School','70m/ep',NULL),('62e55e3a-0ad3-11f1-840d-40c2ba7c15c9','Alice in Borderland','/images/image 216.png','{\"text\": \"Episode Baru\", \"type\": \"episode\"}','Deskripsi Alice in Borderland','50m/ep',NULL),('62e55f54-0ad3-11f1-840d-40c2ba7c15c9','Boku no Hero Academia','/images/image 31.png',NULL,'Deskripsi Boku no Hero Academia','24m/ep',4.6);
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-17 10:30:14
