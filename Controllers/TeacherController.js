const { ObjectId } = require('mongodb');
const  Teacher   = require("../Models/TeacherModel");


// create a function to generate a random employee id
function generateEmployeeId() {
  let result = "";
 // use uPPERCASE to generate a random employee id and use numbers from 0 to 9
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Creating a new teacher
exports.create = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    var employeeId = generateEmployeeId();
    
    var flag = true;
    while(flag){
      const teacher = await Teacher.findOne({ employeeId });
      if (teacher) {
        employeeId = generateEmployeeId();
      }
      else{
        flag = false;
      }
    }

    // Create new teacher
    const newTeacher = await Teacher.create({
      name,
      email,
      password,
      employeeId,
    });

    res.status(201).json({ message: "Teacher created successfully", data: newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Getting all existing teachers
exports.findAll = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Finding a specific teacher through employee id
exports.findOne = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ employeeId: req.params.employeeId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Updating a teacher by employeeId
exports.updateByEmployeeId = async (req, res) => {
  try {
    const { name, email, password, employeeId } = req.body;

    const officer = await Teacher.findOne({ employeeId: req.params.employeeId });

    if (!officer) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    officer.name = name;
    officer.email = email;
    officer.password = password;

    const updatedOfficer = await officer.save();

    res.json({ message: "Teacher updated successfully", data: updatedOfficer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Deleting a specific teacher by employeeId
exports.deleteByEmployeeId = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully", data: deletedTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
