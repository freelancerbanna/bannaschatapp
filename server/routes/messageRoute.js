const addMessage = require("../controllers/messages/addMessage");

const router = require("express").Router();

router.post("/message/addmessage", addMessage);

module.exports = router;
