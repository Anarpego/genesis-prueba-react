CREATE DATABASE cinchos_genesis;
USE cinchos_genesis;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE belt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lower INT DEFAULT 0,
    center INT DEFAULT 0,
    upper INT DEFAULT 0,
    color INT NOT NULL 
);

CREATE TABLE invoice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    belt_id INT,
    invoice_number VARCHAR(255) UNIQUE NOT NULL,
    invoice_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    pricing DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (belt_id) REFERENCES belt(id)
);

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    belt_id INT,
    color INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2),
    total DECIMAL(20, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (belt_id) REFERENCES belt(id)
);

DELIMITER //

CREATE TRIGGER after_item_insert 
AFTER INSERT ON item 
FOR EACH ROW 
BEGIN 
    UPDATE belt SET lower = lower + NEW.quantity, center = center + NEW.quantity, upper = upper + NEW.quantity WHERE id = NEW.belt_id;
END;//

DELIMITER ;
