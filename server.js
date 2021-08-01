const express = require('express');
// const routes = require('./routes');
// const router = express.Router();
const db = require('./config/connection');
const app = express();
const inquirer = require('inquirer');
const PORT = process.env.PORT || 4001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// turn on routes
// app.use(routes);
// app.use("/api", apiRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Hellooooo Wooooorld'
    });
});

app.use((req,res) => {
    res.status(404).end();
});

function toDo () {
    inquirer.prompt({
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            // "View All Employees By Department",
            // "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles"
        ]
    }) 
    .then(function (userInput) {
        var query = "";
            switch(userInput.toDo) {
                case "View All Employees":
                    query = viewAllEmployees();
                    break;
                // case "View All Employees By Department":
                //     query = viewEmployeeWithDepartment();
                //     break;
                // case "View All Employees By Manager":
                //     query = viewEmployeesByManager();
                //     break;
                case "Add Employee":
                    query = addEmployee();
                    break;
                case "Remove Employee":
                    query = removeEmployee();
                    break;
                case "Update Employee Role":
                    query = updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    query = updateEmployeeManager();
                    break;
                case "View All Roles":
                    query = viewAllRoles();
                    break;
            }

            if(query != "") {
                db.query(query, function (err, res) {
                    console.table(res);
                });
            }
    });
};

toDo();

function viewAllEmployees() {
    var allEmployeesQuery = `SELECT * FROM employees`
    return allEmployeesQuery;   
};

// function viewEmployeeWithDepartment() {

//     var employeesWithDepartmentJoin = `
//     SELECT employees.first_name, employees.last_name, departments.department_name
//     LEFT JOIN employees ON employee_roles WHERE employees_roles.id = employees.role_id
//     LEFT JOIN employee_roles ON departments WHERE employee_roles.department_id = departments.id`
//     // RETURNS "SELECT * FROM employees LEFT JOIN departments ON employees.department_id = departments.id"
//     return viewAllEmployees() + " " + employeesWithDepartmentJoin;
//     // return employeesWithDepartmentJoin;
// };

// function viewEmployeesByManager() {

// }

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "...and their last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Accountant",
                "Lawyer",
                "Legal Team Lead"
            ]
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: [
                "None",
                "Jeff Smith",
                "Ronald Firbank"
            ]
        }
    ])
    var addEmployee = `
    INSERT INTO employees
    VALUES (first_name, last_name, role_id, manager_id)
    SELECT * FROM employees`
};

// function removeEmployee() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "removeEmployee",
//             message: "Which employee would you like to remove? (We won't tell)",
//             choices: [employees.first_name, employees.last_name]
//         }
//     ])
//     var removeEmployee = `
//     DELETE FROM employees
//     VALUES (first_name, last_name)`
// }

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseEmployee",
            message: "Which employee's role would you like to update?",
            choices: [employees.first_name, employees.last_name]
        },
        {
            type: "list",
            name: "role",
            message: "Which is the employee's new role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Accountant",
                "Lawyer",
                "Legal Team Lead"
            ]
        }
    ])
    var updateEmployeeRole = `
    SELECT 
    `
}

function updateEmployeeManager() {
    var updateEmployeeManager = ``
}

function viewAllRoles() {
    var allRoles = `SELECT * FROM employee_roles`
    return allRoles;
}

viewAllEmployees();
addEmployee();
// removeEmployee();

// turn on connection to db and server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
  