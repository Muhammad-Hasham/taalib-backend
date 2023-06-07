const express = require("express");
const app = express();
const mongoose = require("mongoose");
const superAdminRoutes = require("./Routes/SuperAdminRoutes");
const academicOfficerRoutes = require("./Routes/AcademicOfficerRoutes");
const accountOfficerRoutes = require("./Routes/AccountOfficerRoutes");
const teacherRoutes = require("./Routes/TeacherRoutes");
require('dotenv').config();
const cors = require("cors");

app.use(express.json());
app.use(cors({origin:"https://taalib-superadmin.onrender.com"}));


const PORT = process.env.PORT || 3001;

app.use(express.json());  

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Mongodb connected to - successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/superadmin", superAdminRoutes);
app.use("/api/academicOfficer", academicOfficerRoutes);
app.use("/api/accountOfficer", accountOfficerRoutes);
app.use("/api/teacher", teacherRoutes);

app.listen(3001, () => {
  console.log(`Server is running at ${PORT}`)
});
