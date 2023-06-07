const express = require("express");
const router = express.Router();

const AccountOfficerController = require("../Controllers/AccountOfficerController");
const { verifyToken } = require("../middleware/auth");

// Create a new Account officer
router.post("/create", verifyToken, AccountOfficerController.create);

// Retrieve all Account officers
router.get("/allaccountofficers", verifyToken, AccountOfficerController.findAll);

// Retrieve a single Account officer with employeeId
router.get("/retrieve/:employeeId", verifyToken, AccountOfficerController.findOne);

// Update a Account officer with employeeId
router.put("/update/:employeeId", verifyToken, AccountOfficerController.updateByEmployeeId);

// Delete a Account officer with employeeId
router.delete("/delete/:employeeId", verifyToken, AccountOfficerController.deleteByEmployeeId);

module.exports = router;
