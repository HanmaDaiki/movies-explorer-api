class TakenEmailError extends Error {
  constructor(message = 'This email is taken') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = TakenEmailError;
