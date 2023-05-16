require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const cors = require('./middlewares/cors');
const apiRequestLimiter = require('./utils/rateLimit');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, NODE_ENV, MONGO_PROD } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD : MONGO_DEV, { useNewUrlParser: true });

app.use(cors);

app.use('/api', index);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
