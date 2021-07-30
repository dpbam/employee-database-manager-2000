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
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles"
        ]
    }) 
    .then(function (userInput) {
            switch(userInput.toDo) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Employees By Department":
                    viewEmployeeWithDepartment();
                    break;
                case "View All Employees By Manager":

            }
    });
};

function viewAllEmployees() {
    var query = `SELECT * FROM employees`
    db.query(query, function (err, res) {
        console.table(res);
        
    });
}

function viewEmployeeWithDepartment() {
    var query = `LEFT JOIN departments ON employees.department_id = departments.id`
    db.query(query, function (err, res) {
        console.table(res);
        
    });
}

toDo();

// app.get('/api/departments', (req, res) => {
//     const sql = `SELECT * FROM employee`
// })

// turn on connection to db and server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
  