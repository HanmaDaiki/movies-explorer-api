class AuthorizationError extends Error {
  constructor(message = 'Authorization error') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
