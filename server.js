const db = require('./config/connection');
const inquirer = require('inquirer');

var figlet = require('figlet');
 
figlet('Employee Manager 2000!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

function toDo () {
    inquirer.prompt({
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Employees",
            "View All Roles",            
            // "View All Employees By Department",
            // "View All Employees By Manager",
            "Add a Department",
            "Add a Role",
            "Add Employee",
            // "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles"
        ]
    }) 
    .then(function (userInput) {
        let query = "";
        switch(userInput.toDo) {
            case "View All Departments":
                query = viewAllDepartments();
                break;
            case "View All Roles":
                query = viewAllRoles();
                break;
            case "View All Employees":
                query = viewAllEmployees();
                break;
            // case "View All Employees By Department":
            //     query = viewEmployeeWithDepartment();
            //     break;
            // case "View All Employees By Manager":
            //     query = viewEmployeesByManager();
            //     break;
            case "Add a Department":
                query = addDepartment();
                break;
            case "Add a Role":
                query = addRole();
                break;
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
    });
};

function viewAllDepartments() {
    let sql = `SELECT * FROM departments`
        db.query(sql, function (err, res) {
            console.table(res);
            toDo();
        });
}

function viewAllEmployees() {
    let sql = `SELECT * FROM employees`
        db.query(sql, function (err, res) {
            console.table(res);
            toDo();
        });
};

function viewAllRoles() {
    let sql = `SELECT title FROM employee_roles`
    db.query(sql, function (err, res) {
        console.table(res);
        toDo();
    });
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
async function addDepartment() {
    const departmentAdd = await inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What's the name of the department you'd like to add?"
        }
    ]);

    db.query( 
        `INSERT INTO departments SET ?`,
        {           
            department_name: departmentAdd.department_name 
        },

        function (err) {
        if (err) throw err;
        viewAllDepartments();
        toDo();
    });
}

async function addRole() {
    const roleAdd = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What's the name of the role you'd like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is this role's salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is this role's department id?"
        }
    ]);

    db.query( 
        `INSERT INTO employee_roles SET ?`,
        {           
            title: roleAdd.title, 
            salary: roleAdd.salary, 
            department_id: roleAdd.department_id
        },

        function (err) {
        if (err) throw err;
        viewAllRoles();
        toDo();
    });
}

async function addEmployee() {
    const employeeRoleTable = `SELECT * FROM employee_roles`
    const employeesTable = `SELECT * FROM employees`
    await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "...and their last name?"
        },
        {
            type: "list",
            name: "title",
            message: "What is the employee's role?",
            choices: employeeRoleTable
            
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
    let sql = `SELECT * FROM employees;`
    let firstName = `SELECT first_name FROM employees;`
    let lastName = `SELECT last_name FROM employees;`
    inquirer.prompt([
        {
            type: "list",
            name: "chooseEmployee",
            message: "Which employee's role would you like to update?",
            choices: [firstName, lastName]
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
}

// function updateEmployeeManager() {
//     var updateEmployeeManager = `
//     SELECT * FROM employees
//     `
// }


toDo();

  