const Movie = require('../models/movies');
const { CREATED } = require('../utils/constants');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((data) => res.send(data))
    .catch(next);
};

const makeMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    // .then((data) => data.populate('owner'))
    .then((data) => res.status(CREATED).send(data))
    .catch(next);
  return null;
};

const deleteMovieId = (req, res, next) => {
  const { _id } = req.params;
  const ownerId = req.user._id;
  return Movie.findById(_id)
    .then((data) => {
      if (!data) {
        return next(new NotFound('Карточка не найдена'));
      }

      // Проверяем, является ли текущий пользователь владельцем карточки
      if (data.owner.toString() !== ownerId.toString()) {
        return next(new Forbidden('У вас нет прав на удаление этой карточки'));
      }
      // Удаляем карточку, так как текущий пользователь - владелец
      return Movie.deleteOne(data)
        .then((deletedMovie) => {
          if (!deletedMovie) {
            return next(new NotFound('Карточка не найдена'));
          }
          return res.send(data);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  makeMovie,
  deleteMovieId,
};
