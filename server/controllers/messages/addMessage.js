const Message = require("../../models/messageModel");

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: {
        text: message,
      },
      user: [from, to],
      sender: from,
    });

    if (data) {
      res.status(200).send({ success: "message send successfully" });
    }
  } catch (err) {
    return res.send({ error: err });
  }
};

module.exports = addMessage;
