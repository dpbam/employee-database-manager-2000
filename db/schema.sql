DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE TABLE department(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
);

CREATE TABLE employee_role(        
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES employee_role(id) 
);