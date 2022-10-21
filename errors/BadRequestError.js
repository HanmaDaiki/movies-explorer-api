class BadRequestError extends Error {
  constructor(message = 'Invalid data sent') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
