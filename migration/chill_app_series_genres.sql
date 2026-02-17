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
-- Table structure for table `series_genres`
--

DROP TABLE IF EXISTS `series_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series_genres` (
  `series_id` char(36) NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`series_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `series_genres_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`) ON DELETE CASCADE,
  CONSTRAINT `series_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series_genres`
--

LOCK TABLES `series_genres` WRITE;
/*!40000 ALTER TABLE `series_genres` DISABLE KEYS */;
INSERT INTO `series_genres` VALUES ('62e55bb6-0ad3-11f1-840d-40c2ba7c15c9',1),('62e55f54-0ad3-11f1-840d-40c2ba7c15c9',1),('62e55bb6-0ad3-11f1-840d-40c2ba7c15c9',3),('62e55f54-0ad3-11f1-840d-40c2ba7c15c9',3),('550e8400-e29b-41d4-a716-446655440000',4),('550e8400-e29b-41d4-a716-446655440000',5),('62e55e3a-0ad3-11f1-840d-40c2ba7c15c9',5),('62e55d0e-0ad3-11f1-840d-40c2ba7c15c9',6),('62e5587f-0ad3-11f1-840d-40c2ba7c15c9',8),('62e55d0e-0ad3-11f1-840d-40c2ba7c15c9',8),('550e8400-e29b-41d4-a716-446655440000',9),('62e5587f-0ad3-11f1-840d-40c2ba7c15c9',14),('62e55e3a-0ad3-11f1-840d-40c2ba7c15c9',14);
/*!40000 ALTER TABLE `series_genres` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-17 10:30:13
