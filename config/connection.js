const mysql = require('mysql2');

require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2750valleydrive',
        database: 'employee_db'
    },
    console.log('Connected to the employee database.')
    );

module.exports = db;