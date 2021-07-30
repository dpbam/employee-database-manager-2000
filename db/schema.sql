DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employee_roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
);

CREATE TABLE employee_roles(        
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT, 
    CONSTRAINT fk_employees FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_roles(id) ON DELETE CASCADE 
);