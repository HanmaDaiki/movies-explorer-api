const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { signUp, signIn } = require('../controllers/sign');

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

module.exports = router;
