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
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `badge` json DEFAULT NULL,
  `desc` text,
  `duration` int DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES ('5e8a838b-0ad3-11f1-840d-40c2ba7c15c9','Don\'t Look at Up','/images/image 233.png',NULL,'Deskripsi singkat Don\'t Look at Up',138,4.5),('5e8b809d-0ad3-11f1-840d-40c2ba7c15c9','Suzume','/images/image11.png','{\"text\": \"Top 3\", \"type\": \"top\"}','Deskripsi singkat Suzume',122,4.9),('5e8be3db-0ad3-11f1-840d-40c2ba7c15c9','Big Hero 6','/images/image10.png','{\"text\": \"Top 10\", \"type\": \"top\"}','Deskripsi singkat Big Hero 6',102,4.4),('5e8be734-0ad3-11f1-840d-40c2ba7c15c9','The Batman','/images/image 22.png','{\"text\": \"Top 10\", \"type\": \"top\"}','Deskripsi singkat The Batman',176,4.9),('5e8be934-0ad3-11f1-840d-40c2ba7c15c9','A Man Called Otto','/images/image 224.png','{\"text\": \"Top 15\", \"type\": \"top\"}','Deskripsi singkat A Man Called Otto',126,4.1),('5e8beb22-0ad3-11f1-840d-40c2ba7c15c9','The Little Mermaid','/images/Frame 74.png','{\"text\": \"Top 10\", \"type\": \"top\"}','Deskripsi singkat The Little Mermaid',135,NULL),('5e8bf722-0ad3-11f1-840d-40c2ba7c15c9','Fast X','/images/Number=4.png','{\"text\": \"Top 10\", \"type\": \"top\"}','Deskripsi singkat Fast X',141,NULL),('5e8c0049-0ad3-11f1-840d-40c2ba7c15c9','Guardians of The Galaxy','/images/image 235.png','{\"text\": \"Top 3\", \"type\": \"top\"}','Deskripsi singkat Guardians',150,NULL);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
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
