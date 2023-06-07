const AccountOfficer = require("../Models/AccountOfficerModel");
const { ObjectId } = require('mongodb');

// Creating a new Account Officer
exports.create = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    const employeeId = new ObjectId().toString();

    // Check if Account officer already exists
    const existingOfficer = await AccountOfficer.findOne({ email });
    if (existingOfficer) {
      return res.status(400).json({ message: "Account officer already exists" });
    }

    // Create new Account officer
    const newOfficer = await AccountOfficer.create({
      name,
      email,
      password,
      employeeId,
    });

    res.status(201).json({ message: "Account officer created successfully", data: newOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Getting all existing Account Officers
exports.findAll = async (req, res) => {
  try {
    const officers = await AccountOfficer.find();
    res.json(officers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//finding a specific Account Officer through employee id
exports.findOne = async (req, res) => {
    try {
      const officer = await AccountOfficer.findOne({ employeeId: req.params.employeeId });
      if (!officer) {
        return res.status(404).json({ message: "Account officer not found" });
      }
      res.json(officer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// Updating an Account Officer by employeeId
exports.updateByEmployeeId = async (req, res) => {
  try {
    const { name, email, password, employeeId } = req.body;

    const officer = await AccountOfficer.findOne({ employeeId: req.params.employeeId });

    if (!officer) {
      return res.status(404).json({ message: "Account officer not found" });
    }

    officer.name = name;
    officer.email = email;
    officer.password = password;

    const updatedOfficer = await officer.save();

    res.json({ message: "Account officer updated successfully", data: updatedOfficer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Deleting a specific Account Officer by employeeId
exports.deleteByEmployeeId = async (req, res) => {
  try {
    const deletedOfficer = await AccountOfficer.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!deletedOfficer) {
      return res.status(404).json({ message: "Account officer not found" });
    }
    res.json({ message: "Account officer deleted successfully", data: deletedOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};