const User = require("../../models/authModel");
const bcrypt = require("bcryptjs");

const authRegsiter = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // find user
    const existUsername = await User.findOne({
      username: username.toLowerCase(),
    });
    const existEmail = await User.findOne({ email: email.toLowerCase() });
    if (existUsername || existEmail) {
      return res.json({
        error: "Username or email already exists",
        status: false,
      });
    }
    // hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    user.password = undefined;
    if (user) {
      res
        .status(200)
        .json({ user, status: true, message: "Registration successfull" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = authRegsiter;
