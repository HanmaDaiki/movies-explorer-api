class ForbiddenError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
