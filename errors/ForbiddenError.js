const { ERROR_403 } = require('../utils/statuscode');

class ForbiddenError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.statusCode = ERROR_403;
  }
}

module.exports = ForbiddenError;
