const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    user: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
