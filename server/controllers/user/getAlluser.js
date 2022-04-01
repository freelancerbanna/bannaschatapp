const User = require("../../models/authModel");

const getAlluser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.status(200).send(users);
  } catch (err) {
    return res.send({ error: err });
  }
};

module.exports = getAlluser;
