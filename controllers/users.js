require('dotenv').config();

const User = require('../models/user');

module.exports.getUserInfo = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch();
};
