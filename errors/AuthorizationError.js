const { ERROR_401 } = require('../utils/statuscode');

class AuthorizationError extends Error {
  constructor(message = 'Authorization error') {
    super(message);
    this.statusCode = ERROR_401;
  }
}

module.exports = AuthorizationError;
