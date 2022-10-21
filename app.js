require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const index = require('./routes/index');
const NotFoundError = require('./errors/NotFoudError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  handler: (req, res) => res.status(429).send({
    message: 'You sent too many requests. Please wait a while then try again',
  }),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(apiRequestLimiter);

app.use(requestLogger);
app.use(cors);

app.use('/', index);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Server Error'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
