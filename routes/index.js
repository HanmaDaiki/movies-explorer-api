const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { signUp, signIn } = require('../controllers/sign');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), signUp);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signIn);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;
