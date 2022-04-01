const User = require("../../models/authModel");

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImage: true,
      avatarImage,
    });
    res
      .status(200)
      .send({ isSet: user.isAvatarImage, image: user.avatarImage });
  } catch (err) {
    return res.json({ status: false, error: err });
  }
};

module.exports = setAvatar;
