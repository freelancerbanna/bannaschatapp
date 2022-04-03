const Message = require("../../models/messageModel");

const getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    const messages = await Message.find({
      user: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const collection = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.status(200).json(collection);
  } catch (err) {
    return res.send({ error: err });
  }
};

module.exports = getAllMessages;
