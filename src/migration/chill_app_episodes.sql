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
-- Table structure for table `episodes`
--

DROP TABLE IF EXISTS `episodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodes` (
  `id` char(36) NOT NULL,
  `series_id` char(36) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `desc` text,
  `duration` int DEFAULT NULL,
  `ep_number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `series_id` (`series_id`),
  CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodes`
--

LOCK TABLES `episodes` WRITE;
/*!40000 ALTER TABLE `episodes` DISABLE KEYS */;
INSERT INTO `episodes` VALUES ('66d23a5a-0ad3-11f1-840d-40c2ba7c15c9','550e8400-e29b-41d4-a716-446655440000','Pilot','/images/image 233.png','https://cdn.contoh.com/video1.mp4','American football coach Ted Lasso is hired by a wealthy divorcee to coach the English soccer team AFC Richmond.',30,1),('66d257e5-0ad3-11f1-840d-40c2ba7c15c9','550e8400-e29b-41d4-a716-446655440000','Biscuits','/images/image 232.png','https://cdn.contoh.com/video2.mp4','It\'s Ted\'s first day of coaching, and fans aren\'t happy. He makes little headway but remains undeterred as the team.',29,2),('66d25d40-0ad3-11f1-840d-40c2ba7c15c9','550e8400-e29b-41d4-a716-446655440000','Trent Crimm: Independent','/images/image 235.png','https://cdn.contoh.com/video3.mp4','To arrange an in-depth exposé, Rebecca pairs cynical journalist Trent Crimm with Ted for a day. Ted and Roy...',30,3),('66d25ffc-0ad3-11f1-840d-40c2ba7c15c9','550e8400-e29b-41d4-a716-446655440000','For The Children','/images/image 222.png','https://cdn.contoh.com/video4.mp4','Rebecca hosts the team\'s annual charity benefit, where Ted stages a reconciliation between Roy and Jamie.',33,4),('66d262c3-0ad3-11f1-840d-40c2ba7c15c9','550e8400-e29b-41d4-a716-446655440000','Tan Lines','/images/image 221.png','https://cdn.contoh.com/video5.mp4','With his wife and son visiting from America, Ted makes drastic changes to the lineup during a critical match.',31,5);
/*!40000 ALTER TABLE `episodes` ENABLE KEYS */;
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
