CREATE TABLE `certificate_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100)
);
INSERT INTO `certificate_facility` VALUES 
(1,'ISO 14001 Certification Facility'),
(2,'Waste Management Standards Authority'),
(3,'Environmental Quality Control Lab');


CREATE TABLE `certificate` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `certificate_facility_id` int,
  FOREIGN KEY (`certificate_facility_id`) REFERENCES `certificate_facility` (`id`)
);
INSERT INTO `certificate` VALUES 
(1,'Organic Certification',1),
(2,'Free-Range Certification',3),
(3,'Animal Welfare Certification',3),
(4,'Sustainable Farming Certification',3),
(5,'Eco-Friendly Farming Certification',2);


CREATE TABLE `raising_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `livestock_type` varchar(100),
  `owner` varchar(100),
  `location` varchar(100),
  `size` varchar(100),
  `employee_number` int
);
INSERT INTO `raising_facility` VALUES 
(1,'Sunny Acres','Cattle','John Doe','Texas','100 acres',50),
(2,'Green Meadow','Sheep','Sarah Lee','California','75 acres',30),
(3,'Farm Fresh','Poultry','Mark Wilson','Florida','50 acres',20),
(4,'Happy Hooves','Goats','Emma Clark','Ohio','60 acres',15),
(5,'Wild Heritage','Pigs','Lucas Hill','Illinois','120 acres',40);


CREATE TABLE `slaughterhouse` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `location` varchar(255),
  `contact_number` varchar(20),
  `capacity` int
);
INSERT INTO `slaughterhouse` VALUES 
(1,'Central Slaughterhouse','123 Meat Rd','123-999-7890',500),
(2,'Eastside Slaughterhouse','456 Butcher St','234-999-8901',400),
(3,'Westside Slaughterhouse','789 Processing Blvd','345-999-9012',300),
(4,'Northside Slaughterhouse','321 Livestock Lane','456-999-0123',350),
(5,'Southside Slaughterhouse','654 Farming Ave','567-999-1234',450);


CREATE TABLE `user` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `email` varchar(100) UNIQUE,
  `phone_number` varchar(100) UNIQUE,
  `is_admin` tinyint(1) DEFAULT '0',
  `password` varchar(255)
);
INSERT INTO `user` VALUES 
(1,'Alice Johnson','alice.johnson@example.com','1234567890',1,'password123'),
(2,'Bob Smith','bob.smith@example.com','2345678901',0,'password123'),
(3,'Charlie Brown','charlie.brown@example.com','3456789012',0,'password123'),
(4,'Diana Ross','diana.ross@example.com','4567890123',1,'password123'),
(5,'Eve Davis','eve.davis@example.com','5678901234',0,'password123');


CREATE TABLE `raising_certificate` (
  `raising_facility_id` int NOT NULL,
  `certificate_id` int NOT NULL,
  FOREIGN KEY (`raising_facility_id`) REFERENCES `raising_facility` (`id`),
  FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`id`)
);
INSERT INTO `raising_certificate` VALUES (1,1),(1,2),(2,2),(3,4);


CREATE TABLE `raising_employee` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `role` varchar(50),
  `birthday` datetime,
  `gender` varchar(1),
  `phone_number` varchar(10),
  `email` varchar(100),
  `raising_facility_id` int,
  FOREIGN KEY (`raising_facility_id`) REFERENCES `raising_facility` (`id`)
);
INSERT INTO `raising_employee` VALUES 
(1,'John Adams','Manager','1980-05-10 00:00:00','M','1234509876','john.adams@sunnyacres.com',1),
(2,'Anna Green','Worker','1992-08-15 00:00:00','F','2345612345','anna.green@greenmeadow.com',2),
(3,'David White','Veterinarian','1985-03-22 00:00:00','M','3456723456','david.white@farmfresh.com',3),
(4,'Emma Black','Supervisor','1990-06-30 00:00:00','F','4567834567','emma.black@happyhooves.com',4),
(5,'Liam Blue','Laborer','1995-12-05 00:00:00','M','5678945678','liam.blue@wildheritage.com',5);


CREATE TABLE `livestock_product` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `raising_facility_id` int,
  FOREIGN KEY (`raising_facility_id`) REFERENCES `raising_facility` (`id`)
);
INSERT INTO `livestock_product` VALUES (1,'Beef',1),(2,'Lamb',2),(3,'Eggs',3),(4,'Cheese',4),(5,'Pork',5);


CREATE TABLE `processing_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `location` varchar(100),
  `owner` varchar(100),
  `type` varchar(100),
  `raising_facility_id` int,
  `slaughterhouse_id` int,
  FOREIGN KEY (`raising_facility_id`) REFERENCES `raising_facility` (`id`),
  FOREIGN KEY (`slaughterhouse_id`) REFERENCES `slaughterhouse` (`id`)
);
INSERT INTO `processing_facility` VALUES
(1,'Beef Processing Inc.','Texas','John Doe','Meat Processing',1,2),
(2,'Lamb Pro Inc.','California','Sarah Lee','Meat Processing',2,1),
(3,'Egg Factory','Florida','Mark Wilson','Egg Processing',3,5),
(4,'Cheese Co.','Ohio','Emma Clark','Dairy Processing',4,3),
(5,'Pork Works','Illinois','Lucas Hill','Meat Processing',5,2);


CREATE TABLE `vet_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `location` varchar(100),
  `contact_number` varchar(100),
  `capacity` int
);
INSERT INTO `vet_facility` VALUES 
(1,'Animal Health Center','111 Pet Lane','123-555-7890',50),
(2,'Farm Vet Services','222 Ranch Blvd','234-555-8901',100),
(3,'Rural Vet Clinic','333 Barnyard Ave','345-555-9012',75),
(4,'Urban Animal Care','444 City Rd','456-555-0123',30),
(5,'Livestock Vet Facility','555 Countryside St','567-555-1234',120);


CREATE TABLE `disposal_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `location` varchar(100),
  `contact_number` varchar(100),
  `capacity` int,
  `vet_facility_id` int,
  FOREIGN KEY (`vet_facility_id`) REFERENCES `vet_facility` (`id`)
);
INSERT INTO `disposal_facility` VALUES 
(1,'Waste Management Center','123 Disposal Rd','123-888-7890',200,1),
(2,'Animal Byproduct Facility','456 Recycling Ave','234-888-8901',300,1),
(3,'Eco-Friendly Disposal','789 Green Blvd','345-888-9012',150,2),
(4,'Rural Waste Facility','321 Farm Rd','456-888-0123',100,2),
(5,'Urban Animal Disposal','654 City Ave','567-888-1234',250,3);


CREATE TABLE `vet_pharmacy` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(255),
  `location` varchar(255),
  `contact_number` varchar(20),
  `opening_hours` varchar(100),
  `vet_facility_id` int,
  FOREIGN KEY (`vet_facility_id`) REFERENCES `vet_facility` (`id`)
);
INSERT INTO `vet_pharmacy` VALUES 
(1,'Healthy Paws Pharmacy','123 Pet Lane','123-456-7890','9 AM - 6 PM',2),
(2,'Animal Meds','456 Veterinary St','234-567-8901','8 AM - 8 PM',3),
(3,'VetCare Plus','789 Farm Rd','345-678-9012','7 AM - 5 PM',1),
(4,'PetRx','321 Ranch Blvd','456-789-0123','10 AM - 7 PM',3),
(5,'Farm Animal Pharmacy','654 Barnyard Ave','567-890-1234','8 AM - 6 PM',5);


CREATE TABLE `waste_treatment_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `location` varchar(100)
);
INSERT INTO `waste_treatment_facility` VALUES 
(1,'Green Waste Treatment Center','New York, USA'),
(2,'EcoWaste Solutions','London, UK'),
(3,'CleanTech Waste Management','Berlin, Germany');


CREATE TABLE `waste_treatment_product` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(100),
  `price` decimal(10,2),
  `facility_id` int NOT NULL,
  FOREIGN KEY (`facility_id`) REFERENCES `waste_treatment_facility` (`id`)
);
INSERT INTO `waste_treatment_product` VALUES 
(1,'Organic Compost',50.00,1),
(2,'Recycled Plastics',75.00,2),
(3,'Industrial Waste Treatment Fluid',120.00,3);


CREATE TABLE `testing_facility` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(255),
  `location` varchar(255),
  `facility_id` int NOT NULL,
  `product_id` int NOT NULL,
  FOREIGN KEY (`facility_id`) REFERENCES `waste_treatment_facility` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `waste_treatment_product` (`id`)
);
INSERT INTO `testing_facility` VALUES 
(1,'Environmental Testing Lab','Chicago, USA',1,1),
(2,'Global Waste Analysis Lab','Manchester, UK',2,2),
(3,'TechnoWaste Research Lab','Munich, Germany',3,3);