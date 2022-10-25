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
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then(() => {
      res.send({ message: 'Movie add to collection!' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data sent for add to collection movies'));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findOne({ _id: id })
    .then((movie) => {
      if (movie === null) {
        return Promise.reject(new NotFoundError('Not Found This Movie in collection'));
      }

      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError());
      }

      return movie;
    })
    .then((movie) => {
      Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Movie is now delete from collection!' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Card Id invailed!'));
      }

      return next(err);
    });
};
