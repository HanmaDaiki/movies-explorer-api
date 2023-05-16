const router = require('express').Router();

const { signUp, signIn } = require('../controllers/sign');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoudError');

router.post('/signup', signUp);
router.post('/signin', signIn);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

module.exports = router;
