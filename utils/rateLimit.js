const rateLimit = require('express-rate-limit');

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  handler: (req, res) => res.status(429).send({
    message: 'You sent too many requests. Please wait a while then try again',
  }),
});

module.exports = apiRequestLimiter;
