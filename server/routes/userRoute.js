const getAlluser = require("../controllers/user/getAlluser");

const router = require("express").Router();

router.get("/user/getalluser/:id", getAlluser);

module.exports = router;
