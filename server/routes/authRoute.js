const express = require("express");
const router = express.Router();

const authRegsiter = require("../controllers/auth/register");
const authLogin = require("../controllers/auth/login");

router.post("/auth/register", authRegsiter);
router.post("/auth/login", authLogin);

module.exports = router;
