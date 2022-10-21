require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { JWT_DEV } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    return next(new AuthorizationError());
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
  } catch (err) {
    return next(new AuthorizationError());
  }

  req.user = payload;

  return next();
};
