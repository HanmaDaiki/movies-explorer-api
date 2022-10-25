const { ERROR_500 } = require('../utils/statuscode');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_500
        ? 'Server Error'
        : message,
    });

  next();
};
