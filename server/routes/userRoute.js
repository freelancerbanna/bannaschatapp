const router = require("express").Router();

const getAlluser = require("../controllers/user/getAlluser");

router.get("/user/getalluser/:id", getAlluser);

module.exports = router;
