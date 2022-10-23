require('dotenv').config();

const { MONGO_PROD, NODE_ENV } = process.env;

module.exports = {
  JWT_DEV: 'dev-secret',
  MONGO_ADRESS: NODE_ENV === 'production' ? MONGO_PROD : 'mongodb://localhost:27017/moviesdb',
};
