const { ERROR_400 } = require('../utils/statuscode');

class BadRequestError extends Error {
  constructor(message = 'Invalid data sent') {
    super(message);
    this.statusCode = ERROR_400;
  }
}

module.exports = BadRequestError;
