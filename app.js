require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const users = require('./routes/users');
const sign = require('./routes/sign');
const movies = require('./routes/movies');
const NotFoundError = require('./errors/NotFoudError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(cors);

app.use('/', sign);
app.use('/users', users);
app.use('/movies', movies);

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
