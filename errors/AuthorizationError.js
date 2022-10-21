class AuthorizationError extends Error {
  constructor(message = 'To get started, log in') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
