const { ERROR_404 } = require('../utils/statuscode');

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.statusCode = ERROR_404;
  }
}

module.exports = NotFoundError;
