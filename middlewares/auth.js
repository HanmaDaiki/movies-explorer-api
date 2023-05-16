require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { JWT_DEV } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AuthorizationError();
  }

  let payload;

  try {
    payload = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError();
  }

  req.user = payload;

  return next();
};
