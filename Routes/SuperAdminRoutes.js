const express = require("express");
const router = express.Router();
const SuperAdminController = require("../Controllers/SuperAdminController");

router.post("/signup", SuperAdminController.signup);
router.post("/login", SuperAdminController.login);

module.exports = router;
