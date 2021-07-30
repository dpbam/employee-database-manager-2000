const express = require('express');
// const router = express.Router();
const db = require('../../config/connection');

// Get all employee roles
app.get('/employee_roles', (req, res) => {
    const sql = `SELECT * FROM employee_roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get one employee role
app.get('/employee_role/:id', (req, res) => {
    const sql = `SELECT * FROM employee_role WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
        message: 'success',
        data: row
        });
    });
});

// Create a role
app.post('/employee_role', ({ body }, res) => {
    const sql = `INSERT INTO employee-roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
    });
})

// Update a role
app.put('/employee_role/:id', (req, res) => {
    const sql = `UPDATE employee_roles SET title = ? WHERE id = ?`;
    const params = [req.body.title, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Voter not found'
          });
        } else {
          res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
          });
        }
    });
})


module.exports = router;