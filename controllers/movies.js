const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoudError');
const Movie = require('../models/movie');

module.exports.getMoviesUser = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then(() => {
      res.send({ message: 'Movie add to collection!' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return Promise.reject(new BadRequestError('Invalid data sent for add to collection movies'));
      }

      return next();
    })
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findOneAndDelete({ movieId: id })
    .then((movie) => {
      if (movie === null) {
        return Promise.reject(new NotFoundError('Not Found This Movie in collection'));
      }

      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError());
      }

      return res.send({ message: 'Movie is now delete from collection!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return Promise.reject(new BadRequestError('Card Id invailed!'));
      }

      return next(err);
    })
    .catch((err) => next(err));
};
