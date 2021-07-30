const express = require('express');
// const router = express.Router();
const db = require('../../config/connection');

// Get all the departments
app.get('/department', (req, res) => {
    const sql = `SELECT * FROM departments`;

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

app.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
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

// Create a department record
app.post('/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (department_name) VALUE (?)`;
    
    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body,
          changes: result.affectedRows
        });
    }); 
});

