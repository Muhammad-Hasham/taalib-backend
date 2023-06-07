const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SuperAdmin = require("../Models/SuperAdminModel");

exports.signup = async (req, res) => {
    try {
      const { username, email, password, firstName, lastName } = req.body;
  
      // Check if user already exists
      const existingUser = await SuperAdmin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = await SuperAdmin.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await SuperAdmin.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRETKEY, {
        expiresIn:'24h',
    });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
