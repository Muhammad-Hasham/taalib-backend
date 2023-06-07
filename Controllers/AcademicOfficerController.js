const AcademicOfficer = require("../Models/AcademicOfficerModel");
const { ObjectId } = require('mongodb');

// Creating a new Academic Officer
exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const employeeId = new ObjectId().toString();

    // Check if academic officer already exists
    const existingOfficer = await AcademicOfficer.findOne({ email });
    if (existingOfficer) {
      return res.status(400).json({ message: "Academic officer already exists" });
    }

    // Create new academic officer
    const newOfficer = await AcademicOfficer.create({
      name,
      email,
      password,
      employeeId,
    });

    res.status(201).json({ message: "Academic officer created successfully", data: newOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Getting all existing Academic Officers
exports.findAll = async (req, res) => {
  try {
    const officers = await AcademicOfficer.find();
    res.json(officers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//finding a specific Academic Officer through employee id
exports.findOne = async (req, res) => {
    try {
      const officer = await AcademicOfficer.findOne({ employeeId: req.params.employeeId });
      if (!officer) {
        return res.status(404).json({ message: "Academic officer not found" });
      }
      res.json(officer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// Updating an Academic Officer by employeeId
exports.updateByEmployeeId = async (req, res) => {
  try {
    const { name, email, password, employeeId } = req.body;

    const officer = await AcademicOfficer.findOne({ employeeId: req.params.employeeId });

    if (!officer) {
      return res.status(404).json({ message: "Academic officer not found" });
    }

    officer.name = name;
    officer.email = email;
    officer.password = password;

    const updatedOfficer = await officer.save();

    res.json({ message: "Academic officer updated successfully", data: updatedOfficer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Deleting a specific Academic Officer by employeeId
exports.deleteByEmployeeId = async (req, res) => {
  try {
    const deletedOfficer = await AcademicOfficer.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!deletedOfficer) {
      return res.status(404).json({ message: "Academic officer not found" });
    }
    res.json({ message: "Academic officer deleted successfully", data: deletedOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};