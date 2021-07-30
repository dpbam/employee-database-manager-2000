const { Router } = require('express');
const User = require('./User');
const router = require('express').Router();

router.use(require('./departmentRoutes'));
router.use(require('./employeeRoleRoutes'));
router.use(require('./employeeRoutes'));

module.exports = { User };
