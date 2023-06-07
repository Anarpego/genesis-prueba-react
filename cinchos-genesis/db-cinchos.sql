CREATE DATABASE cinchos_genesis;
USE cinchos_genesis;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE invoice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    invoice_number VARCHAR(255) UNIQUE NOT NULL,
    invoice_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    pricing DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE belt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lower INT DEFAULT 1,
    center INT DEFAULT 1,
    upper INT DEFAULT 1
);

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    belt_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) DEFAULT 30.0,
    total DECIMAL(20, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (belt_id) REFERENCES belt(id)
);
