const { ERROR_409 } = require('../utils/statuscode');

class TakenError extends Error {
  constructor(message = 'This is taken') {
    super(message);
    this.statusCode = ERROR_409;
  }
}

module.exports = TakenError;
