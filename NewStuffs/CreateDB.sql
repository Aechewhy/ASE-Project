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
