require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const index = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { ERROR_500 } = require('./utils/statuscode');
const { MONGO_ADRESS } = require('./utils/config');
const apiRequestLimiter = require('./utils/rateLimit');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_ADRESS, { useNewUrlParser: true });

app.use(apiRequestLimiter);

app.use(requestLogger);
app.use(cors);

app.use('/api', index);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_500
        ? 'Server Error'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
