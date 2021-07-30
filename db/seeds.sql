INSERT INTO departments (department_name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO employee_roles (title, salary, department_id)
VALUES
    ("Sales Lead", 63000.00, 1),
    ("Salesperson", 47000.00, 1),
    ("Lead Engineer", 71000.00, 2),
    ("Software Engineer", 48000.00, 2),
    ("Accountant", 57000.00, 3),
    ("Lawyer", 119000.00, 4),
    ("Legal Team Lead", 141000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
-- Jeff Smith is the manager because he doesn't have a manager (NULL), 
-- doesn't become a manager until his id is connected to another employee
    ("Jeff", "Smith", 1, NULL),
    ("Sue", "Storm", 2, 1),
    ('Ronald', 'Firbank', 3, NULL);
    
