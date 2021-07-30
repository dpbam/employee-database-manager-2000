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
    ("Jeff", "Smith", 1, 1),
    ("Sue", "Storm", 3, NULL),
    ("Diana", "McNary", 6, NULL),
    ("Eric", "Jameson", 4, NULL),
    ("Christina", "Fuentes", 4, 1);
