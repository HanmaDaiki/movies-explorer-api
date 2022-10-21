const { ERROR_401 } = require('../utils/statuscode');

class AuthorizationError extends Error {
  constructor(message = 'To get started, log in') {
    super(message);
    this.statusCode = ERROR_401;
  }
}

module.exports = AuthorizationError;
