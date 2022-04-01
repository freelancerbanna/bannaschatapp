const router = require("express").Router();

const authRegsiter = require("../controllers/auth/register");
const authLogin = require("../controllers/auth/login");
const setAvatar = require("../controllers/auth/setAvatar");

router.post("/auth/register", authRegsiter);
router.post("/auth/login", authLogin);
router.post("/auth/setAvatar/:id", setAvatar);

module.exports = router;
