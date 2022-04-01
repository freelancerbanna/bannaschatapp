const getAlluser = require("../controllers/user/getAlluser");

const router = require("express").Router();

router.get("/user/getalluser", getAlluser);

module.exports = router;
