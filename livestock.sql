-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: livestock
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS certificate;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE certificate (
  id int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  certificate_facility_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY certificate_facility_id (certificate_facility_id),
  CONSTRAINT certificate_ibfk_1 FOREIGN KEY (certificate_facility_id) REFERENCES certificate_facility (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES certificate WRITE;
/*!40000 ALTER TABLE certificate DISABLE KEYS */;
INSERT INTO certificate VALUES (1,'Organic Certification',1),(2,'Free-Range Certification',3),(3,'Animal Welfare Certification',3),(4,'Sustainable Farming Certification',3),(5,'Eco-Friendly Farming Certification',2),(6,'Nah',1);
/*!40000 ALTER TABLE certificate ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_facility`
--

DROP TABLE IF EXISTS certificate_facility;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE certificate_facility (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_facility`
--

LOCK TABLES certificate_facility WRITE;
/*!40000 ALTER TABLE certificate_facility DISABLE KEYS */;
INSERT INTO certificate_facility VALUES (1,'ISO 14001 Certification Facility'),(2,'Waste Management Standards Authority'),(3,'Environmental Quality Control Lab');
/*!40000 ALTER TABLE certificate_facility ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livestock_product`
--

DROP TABLE IF EXISTS livestock_product;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE livestock_product (
  id int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  raising_facility_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY raising_facility_id (raising_facility_id),
  CONSTRAINT livestock_product_ibfk_1 FOREIGN KEY (raising_facility_id) REFERENCES raising_facility (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livestock_product`
--

LOCK TABLES livestock_product WRITE;
/*!40000 ALTER TABLE livestock_product DISABLE KEYS */;
INSERT INTO livestock_product VALUES (1,'Beef',1),(2,'Lamb',2),(3,'Eggs',3),(4,'Cheese',4),(5,'Pork',5);
/*!40000 ALTER TABLE livestock_product ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processing_facility`
--

DROP TABLE IF EXISTS processing_facility;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE processing_facility (
  id int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  location varchar(100) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  raising_facility_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY raising_facility_id (raising_facility_id),
  CONSTRAINT processing_facility_ibfk_1 FOREIGN KEY (raising_facility_id) REFERENCES raising_facility (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processing_facility`
--

LOCK TABLES processing_facility WRITE;
/*!40000 ALTER TABLE processing_facility DISABLE KEYS */;
INSERT INTO processing_facility VALUES (1,'Beef Processing Inc.','Texas','John Doe','Meat Processing',1),(2,'Lamb Pro Inc.','California','Sarah Lee','Meat Processing',2),(3,'Egg Factory','Florida','Mark Wilson','Egg Processing',3),(4,'Cheese Co.','Ohio','Emma Clark','Dairy Processing',4),(5,'Pork Works','Illinois','Lucas Hill','Meat Processing',5);
/*!40000 ALTER TABLE processing_facility ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raising_certificate`
--

DROP TABLE IF EXISTS raising_certificate;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE raising_certificate (
  raising_facility_id int DEFAULT NULL,
  certificate_id int DEFAULT NULL,
  id int NOT NULL,
  PRIMARY KEY (id),
  KEY raising_facility_id (raising_facility_id),
  KEY certificate_id (certificate_id),
  CONSTRAINT raising_certificate_ibfk_1 FOREIGN KEY (raising_facility_id) REFERENCES raising_facility (id),
  CONSTRAINT raising_certificate_ibfk_2 FOREIGN KEY (certificate_id) REFERENCES certificate (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raising_certificate`
--

LOCK TABLES raising_certificate WRITE;
/*!40000 ALTER TABLE raising_certificate DISABLE KEYS */;
INSERT INTO raising_certificate VALUES (1,1,1),(1,2,2),(2,2,3),(3,4,4);
/*!40000 ALTER TABLE raising_certificate ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raising_employee`
--

DROP TABLE IF EXISTS raising_employee;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE raising_employee (
  id int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  birthday date DEFAULT NULL,
  gender varchar(1) DEFAULT NULL,
  phone_number varchar(10) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  raising_facility_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY raising_facility_id (raising_facility_id),
  CONSTRAINT raising_employee_ibfk_1 FOREIGN KEY (raising_facility_id) REFERENCES raising_facility (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raising_employee`
--

LOCK TABLES raising_employee WRITE;
/*!40000 ALTER TABLE raising_employee DISABLE KEYS */;
INSERT INTO raising_employee VALUES (1,'John Adams','Manager','1980-05-10','M','1234509876','john.adams@sunnyacres.com',1),(2,'Anna Green','Worker','1992-08-15','F','2345612345','anna.green@greenmeadow.com',2),(3,'David White','Veterinarian','1985-03-22','M','3456723456','david.white@farmfresh.com',3),(4,'Emma Black','Supervisor','1990-06-30','F','4567834567','emma.black@happyhooves.com',4),(5,'Liam Blue','Laborer','1995-12-05','M','5678945678','liam.blue@wildheritage.com',5);
/*!40000 ALTER TABLE raising_employee ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raising_facility`
--

DROP TABLE IF EXISTS raising_facility;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE raising_facility (
  id int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  livestock_type varchar(100) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  location varchar(100) DEFAULT NULL,
  size varchar(50) DEFAULT NULL,
  employee_number int DEFAULT NULL,
  certificate_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY certificate_id (certificate_id),
  CONSTRAINT raising_facility_ibfk_1 FOREIGN KEY (certificate_id) REFERENCES certificate (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raising_facility`
--

LOCK TABLES raising_facility WRITE;
/*!40000 ALTER TABLE raising_facility DISABLE KEYS */;
INSERT INTO raising_facility VALUES (1,'Sunny Acres','Cattle','John Doe','Texas','100 acres',50,1),(2,'Green Meadow','Sheep','Sarah Lee','California','75 acres',30,2),(3,'Farm Fresh','Poultry','Mark Wilson','Florida','50 acres',20,3),(4,'Happy Hooves','Goats','Emma Clark','Ohio','60 acres',15,4),(5,'Wild Heritage','Pigs','Lucas Hill','Illinois','120 acres',40,5);
/*!40000 ALTER TABLE raising_facility ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_facility`
--

DROP TABLE IF EXISTS testing_facility;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE testing_facility (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  facility_id int NOT NULL,
  product_id int NOT NULL,
  PRIMARY KEY (id),
  KEY FK_WasteTreatmentFacility (facility_id),
  KEY FK_WasteTreatmentProduct (product_id),
  CONSTRAINT FK_WasteTreatmentFacility FOREIGN KEY (facility_id) REFERENCES waste_treatment_facility (id),
  CONSTRAINT FK_WasteTreatmentProduct FOREIGN KEY (product_id) REFERENCES waste_treatment_product (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_facility`
--

LOCK TABLES testing_facility WRITE;
/*!40000 ALTER TABLE testing_facility DISABLE KEYS */;
INSERT INTO testing_facility VALUES (1,'Environmental Testing Lab','Chicago, USA',1,1),(2,'Global Waste Analysis Lab','Manchester, UK',2,2),(3,'TechnoWaste Research Lab','Munich, Germany',3,3);
/*!40000 ALTER TABLE testing_facility ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS user;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  phone_number varchar(100) DEFAULT NULL,
  is_admin tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  UNIQUE KEY phone_number (phone_number)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES user WRITE;
/*!40000 ALTER TABLE user DISABLE KEYS */;
INSERT INTO user VALUES (1,'Alice Johnson','alice.johnson@example.com','1234567890',1),(2,'Bob Smith','bob.smith@example.com','2345678901',0),(3,'Charlie Brown','charlie.brown@example.com','3456789012',0),(4,'Diana Ross','diana.ross@example.com','4567890123',1),(5,'Eve Davis','eve.davis@example.com','5678901234',0);
/*!40000 ALTER TABLE user ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_treatment_facility`
--

DROP TABLE IF EXISTS waste_treatment_facility;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE waste_treatment_facility (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_treatment_facility`
--

LOCK TABLES waste_treatment_facility WRITE;
/*!40000 ALTER TABLE waste_treatment_facility DISABLE KEYS */;
INSERT INTO waste_treatment_facility VALUES (1,'Green Waste Treatment Center','New York, USA'),(2,'EcoWaste Solutions','London, UK'),(3,'CleanTech Waste Management','Berlin, Germany');
/*!40000 ALTER TABLE waste_treatment_facility ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_treatment_product`
--

DROP TABLE IF EXISTS waste_treatment_product;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE waste_treatment_product (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  price decimal(10,2) NOT NULL,
  facility_id int NOT NULL,
  PRIMARY KEY (id),
  KEY FK_Facility (facility_id),
  CONSTRAINT FK_Facility FOREIGN KEY (facility_id) REFERENCES waste_treatment_facility (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_treatment_product`
--

LOCK TABLES waste_treatment_product WRITE;
/*!40000 ALTER TABLE waste_treatment_product DISABLE KEYS */;
INSERT INTO waste_treatment_product VALUES (1,'Organic Compost',50.00,1),(2,'Recycled Plastics',75.00,2),(3,'Industrial Waste Treatment Fluid',120.00,3);
/*!40000 ALTER TABLE waste_treatment_product ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-14 19:23:42
