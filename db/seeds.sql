INSERT INTO department (id, department_name)
VALUES
    (1, "Sales"),
    (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal");

INSERT INTO employee_role (id, title, salary, department_id)
VALUES
    (1, "Sales Lead", 63000.00, 100),
    (2, "Salesperson", 47000.00, 101),
    (3, "Lead Engineer", 71000.00, 102),
    (4, "Software Engineer", 48000.00, 103),
    (5, "Accountant", 57000.00, 104),
    (6, "Lawyer", 119000.00, 105),
    (7, "Legal Team Lead", 141000, 106);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Jeff", "Smith", 12, 22),
    (2, "Sue", "Storm", 11, 21),
    (3, "Diana", "McNary", 13, 23),
    (4, "Eric", "Jameson", 14, 24);
