const express = require("express");
const router = express.Router();

const AcademicOfficerController = require("../Controllers/AcademicOfficerController");
const { verifyToken } = require("../middleware/auth");

// Create a new academic officer
router.post("/create", verifyToken, AcademicOfficerController.create);

// Retrieve all academic officers
router.get("/allacademicofficers", verifyToken, AcademicOfficerController.findAll);

// Retrieve a single academic officer with employeeId
router.get("/retrieve/:employeeId", verifyToken, AcademicOfficerController.findOne);


// Update a academic officer with employeeId
router.put("/update/:employeeId", verifyToken, AcademicOfficerController.updateByEmployeeId);

// Delete a academic officer with employeeId
router.delete("/delete/:employeeId", verifyToken, AcademicOfficerController.deleteByEmployeeId);


module.exports = router;
