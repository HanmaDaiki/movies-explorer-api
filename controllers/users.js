require('dotenv').config();

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoudError');
const User = require('../models/user');

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (user === null) {
        return Promise.reject(new NotFoundError('Id Not Found'));
      }

      return res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return Promise.reject(new BadRequestError());
      }

      if (err.name === 'CastError') {
        return Promise.reject(new NotFoundError('User Not Found'));
      }

      return next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;

  User.findByIdAndUpdate(_id, { email, name }, { new: true })
    .then((user) => {
      if (user === null) {
        return Promise.reject(new NotFoundError('Id Not Found'));
      }

      return res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return Promise.reject(new BadRequestError());
      }

      if (err.name === 'CastError') {
        return Promise.reject(new NotFoundError('User Not Found'));
      }

      return next();
    })
    .catch((err) => {
      next(err);
    });
};
