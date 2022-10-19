const router = require('express').Router();
const { getMoviesUser, postMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMoviesUser);
router.post('/', postMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
