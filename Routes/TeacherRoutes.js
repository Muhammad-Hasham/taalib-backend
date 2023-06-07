const express = require('express');
const router = express.Router();

const teacherController = require('../Controllers/TeacherController');
const { verifyToken } = require("../middleware/auth");

// Create a new teacher
router.post('/create', verifyToken, teacherController.create);

// Get all teachers
router.get('/allteachers', verifyToken, teacherController.findAll);

// retrieve a teacher by employeeId
router.get('/retrieve/:employeeId', verifyToken, teacherController.findOne);

// Update a teacher by employeeId
router.put('/update/:employeeId', verifyToken, teacherController.updateByEmployeeId);

// Delete a teacher by employeeId
router.delete('/delete/:employeeId', verifyToken, teacherController.deleteByEmployeeId);

module.exports = router;
