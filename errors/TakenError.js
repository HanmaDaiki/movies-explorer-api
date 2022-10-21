class TakenError extends Error {
  constructor(message = 'This is taken') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = TakenError;
