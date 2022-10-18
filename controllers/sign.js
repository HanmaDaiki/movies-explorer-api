require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const TakenEmailError = require('../errors/TakenEmailError');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then(() => res.send({ message: 'Registration has been successfully completed' }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return Promise.reject(new BadRequestError('Invalid data sent for create new user'));
          }

          if (err.code === 11000) {
            return Promise.reject(new TakenEmailError());
          }

          return next();
        })
        .catch((err) => {
          next(err);
        });
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.identificationUser(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id.toString() },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => next(err));
};
