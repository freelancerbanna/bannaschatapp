const User = require("../../models/authModel");
const bcrypt = require("bcryptjs");

const authLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    // find user
    const findUserName = await User.findOne({
      username: email.toLowerCase(),
    });
    const findEmail = await User.findOne({ email: email.toLowerCase() });

    const user = findUserName || findEmail;

    if (!user) {
      return res.json({
        error: "Username or email not found",
        status: false,
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.json({
        error: "Password is invalid",
        status: false,
      });
    } else {
      user.password = undefined;
      res.status(200).json({ user, status: true, message: "Login sucessfull" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = authLogin;
