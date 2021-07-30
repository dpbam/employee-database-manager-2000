const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

// get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, `;

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

// Get single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employees.*, WHERE id = ?`;
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

// Create an employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`; 
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
    ];
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

// Update an employee's record
router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employees SET (first_name, last_name) WHERE id = ?`;
    const params = [
      req.body.first_name, 
      req.body.last_name, 
      req.body.role_id, 
      req.body.manager_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Candidate not found'
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

router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
          res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Candidate not found'
          });
        } else {
          res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
          });
        }
    });
})