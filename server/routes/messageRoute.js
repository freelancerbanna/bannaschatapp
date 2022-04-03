const addMessage = require("../controllers/messages/addMessage");
const getAllMessages = require("../controllers/messages/getAllMessages");

const router = require("express").Router();

router.post("/message/addmessage", addMessage);
router.post("/message/getmessages", getAllMessages);

module.exports = router;
