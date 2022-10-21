require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AuthorizationError();
  }

  let payload;

  try {
<<<<<<< HEAD
<<<<<<< HEAD
    payload = jwt.verify(token.replace('Bearer ', ''), NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
=======
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
>>>>>>> parent of 871d809 (add-fix:errors codes file,config file+dependencies)
=======
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
>>>>>>> parent of 871d809 (add-fix:errors codes file,config file+dependencies)
  } catch (err) {
    throw new AuthorizationError();
  }

  req.user = payload;

  return next();
};
