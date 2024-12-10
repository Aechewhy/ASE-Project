CREATE DATABASE livestock;
USE livestock;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    is_admin BOOLEAN
);

CREATE TABLE certificate (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE raising_facility (
    id INT NOT NULL PRIMARY KEY,          -- Primary Key
    name VARCHAR(100),                    -- Name of the facility
    livestock_type VARCHAR(100),          -- Type of livestock
    owner VARCHAR(100),                   -- Owner of the facility
    location VARCHAR(100),                -- Facility location
    size VARCHAR(50),                     -- Size of the facility
    employee_number INT,                  -- Number of employees
    certificate_id INT,                   -- Foreign Key to a certificate table
    FOREIGN KEY (certificate_id) REFERENCES certificate(id)
);

CREATE TABLE raising_employee (
    id INT NOT NULL PRIMARY KEY,          -- Primary Key
    name VARCHAR(100),                    -- Employee name
    role VARCHAR(50),                     -- Role of the employee
    birthday DATE,                        -- Date of birth
    gender VARCHAR(1),                    -- Gender (e.g., 'M' or 'F')
    phone_number VARCHAR(10),             -- Phone number
    email VARCHAR(100),                   -- Email address
    raising_facility_id INT,              -- Foreign Key to raising_facility table
    FOREIGN KEY (raising_facility_id) REFERENCES raising_facility(id)
);

CREATE TABLE livestock_product (
    id INT NOT NULL PRIMARY KEY,          -- Primary Key
    name VARCHAR(100),                    -- Name of the product
    raising_facility_id INT,              -- Foreign Key to raising_facility table
    FOREIGN KEY (raising_facility_id) REFERENCES raising_facility(id)
);

CREATE TABLE processing_facility (
    id INT NOT NULL PRIMARY KEY,          -- Primary Key
    name VARCHAR(100),                    -- Name of the facility
    location VARCHAR(100),                -- Facility location
    owner VARCHAR(100),                   -- Owner of the facility
    type VARCHAR(100),                    -- Type of processing facility
    raising_facility_id INT,              -- Foreign Key to raising_facility table
    FOREIGN KEY (raising_facility_id) REFERENCES raising_facility(id)
);
CREATE TABLE waste_treatment_facility (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Auto-incrementing ID for unique identification
    name VARCHAR(255) NOT NULL,      -- Name of the facility (maximum 255 characters)
    location VARCHAR(255) NOT NULL   -- Location of the facility (maximum 255 characters)
);
CREATE TABLE waste_treatment_product (
    id INT AUTO_INCREMENT PRIMARY KEY,     -- Auto-incrementing ID for unique identification
    name VARCHAR(255) NOT NULL,            -- Name of the product
    price DECIMAL(10, 2) NOT NULL,         -- Price of the product with two decimal places
    facility_id INT NOT NULL,              -- Foreign key referencing waste_treatment_facility table
    CONSTRAINT FK_Facility FOREIGN KEY (facility_id) REFERENCES waste_treatment_facility(id)
);
CREATE TABLE testing_facility (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Auto-incrementing primary key
    name VARCHAR(255) NOT NULL,                -- Name of the testing facility
    location VARCHAR(255) NOT NULL,            -- Location of the testing facility
    facility_id INT NOT NULL,  -- Foreign key to waste_treatment_facility table
    product_id INT NOT NULL,   -- Foreign key to waste_treatment_product table
    CONSTRAINT FK_WasteTreatmentFacility FOREIGN KEY (facility_id) REFERENCES waste_treatment_facility(id),
    CONSTRAINT FK_WasteTreatmentProduct FOREIGN KEY (product_id) REFERENCES waste_treatment_product(id)
);
CREATE TABLE certificate_facility (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    name VARCHAR(255) NOT NULL         -- Name of the certificate facility
);
CREATE TABLE certificate_certificate_facility (
    certificate_id INT NOT NULL,                   -- Foreign key to certificate table
    certificate_facility_id INT NOT NULL,          -- Foreign key to certificate_facility table
    PRIMARY KEY (certificate_id, certificate_facility_id), -- Composite primary key
    CONSTRAINT FK_Certificate FOREIGN KEY (certificate_id) REFERENCES certificate(id),
    CONSTRAINT FK_CertificateFacility FOREIGN KEY (certificate_facility_id) REFERENCES certificate_facility(id)
);

INSERT INTO user (name, email, phone_number, is_admin) VALUES
('Alice Johnson', 'alice.johnson@example.com', '1234567890', TRUE),
('Bob Smith', 'bob.smith@example.com', '2345678901', FALSE),
('Charlie Brown', 'charlie.brown@example.com', '3456789012', FALSE),
('Diana Ross', 'diana.ross@example.com', '4567890123', TRUE),
('Eve Davis', 'eve.davis@example.com', '5678901234', FALSE);

-- Inserting data into 'certificate' table
INSERT INTO certificate (id, name) VALUES
(1, 'Organic Certification'),
(2, 'Free-Range Certification'),
(3, 'Animal Welfare Certification'),
(4, 'Sustainable Farming Certification'),
(5, 'Eco-Friendly Farming Certification');

-- Inserting data into 'raising_facility' table
INSERT INTO raising_facility (id, name, livestock_type, owner, location, size, employee_number, certificate_id) VALUES
(1, 'Sunny Acres', 'Cattle', 'John Doe', 'Texas', '100 acres', 50, 1),
(2, 'Green Meadow', 'Sheep', 'Sarah Lee', 'California', '75 acres', 30, 2),
(3, 'Farm Fresh', 'Poultry', 'Mark Wilson', 'Florida', '50 acres', 20, 3),
(4, 'Happy Hooves', 'Goats', 'Emma Clark', 'Ohio', '60 acres', 15, 4),
(5, 'Wild Heritage', 'Pigs', 'Lucas Hill', 'Illinois', '120 acres', 40, 5);

-- Inserting data into 'raising_employee' table
INSERT INTO raising_employee (id, name, role, birthday, gender, phone_number, email, raising_facility_id) VALUES
(1, 'John Adams', 'Manager', '1980-05-10', 'M', '1234509876', 'john.adams@sunnyacres.com', 1),
(2, 'Anna Green', 'Worker', '1992-08-15', 'F', '2345612345', 'anna.green@greenmeadow.com', 2),
(3, 'David White', 'Veterinarian', '1985-03-22', 'M', '3456723456', 'david.white@farmfresh.com', 3),
(4, 'Emma Black', 'Supervisor', '1990-06-30', 'F', '4567834567', 'emma.black@happyhooves.com', 4),
(5, 'Liam Blue', 'Laborer', '1995-12-05', 'M', '5678945678', 'liam.blue@wildheritage.com', 5);

-- Inserting data into 'livestock_product' table
INSERT INTO livestock_product (id, name, raising_facility_id) VALUES
(1, 'Beef', 1),
(2, 'Lamb', 2),
(3, 'Eggs', 3),
(4, 'Cheese', 4),
(5, 'Pork', 5);

-- Inserting data into 'processing_facility' table
INSERT INTO processing_facility (id, name, location, owner, type, raising_facility_id) VALUES
(1, 'Beef Processing Inc.', 'Texas', 'John Doe', 'Meat Processing', 1),
(2, 'Lamb Pro Inc.', 'California', 'Sarah Lee', 'Meat Processing', 2),
(3, 'Egg Factory', 'Florida', 'Mark Wilson', 'Egg Processing', 3),
(4, 'Cheese Co.', 'Ohio', 'Emma Clark', 'Dairy Processing', 4),
(5, 'Pork Works', 'Illinois', 'Lucas Hill', 'Meat Processing', 5);

INSERT INTO waste_treatment_facility (name, location) 
VALUES 
('Green Waste Treatment Center', 'New York, USA'),
('EcoWaste Solutions', 'London, UK'),
('CleanTech Waste Management', 'Berlin, Germany');
INSERT INTO waste_treatment_product (name, price, facility_id) 
VALUES 
('Organic Compost', 50.00, 1), 
('Recycled Plastics', 75.00, 2),
('Industrial Waste Treatment Fluid', 120.00, 3);
INSERT INTO testing_facility (name, location, facility_id, product_id) 
VALUES 
('Environmental Testing Lab', 'Chicago, USA', 1, 1), 
('Global Waste Analysis Lab', 'Manchester, UK', 2, 2),
('TechnoWaste Research Lab', 'Munich, Germany', 3, 3);
INSERT INTO certificate_facility (name) 
VALUES 
('ISO 14001 Certification Facility'),
('Waste Management Standards Authority'),
('Environmental Quality Control Lab');
INSERT INTO certificate_certificate_facility (certificate_id, certificate_facility_id) 
VALUES 
(1, 1),  -- ISO 14001 linked with ISO 14001 Certification Facility
(2, 2),  -- Waste Treatment Process Certification linked with Waste Management Standards Authority
(3, 3);  -- Environmental Compliance Certificate linked with Environmental Quality Control Lab