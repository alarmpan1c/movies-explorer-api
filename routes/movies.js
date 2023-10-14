const moviesRout = require('express').Router();
const { getAllMovies } = require('../controllers/movies');
const { makeMovie } = require('../controllers/movies');
const { deleteMovieId } = require('../controllers/movies');
// const { putLike } = require('../controllers/movies');
// const { deleteLike } = require('../controllers/movies');
const {
  movieValid,
  movieIdValid,
} = require('../middlewares/validation');

moviesRout.get('/', getAllMovies);

moviesRout.post('/', movieValid, makeMovie);

moviesRout.delete('/:_id', movieIdValid, deleteMovieId);

// moviesRout.put('/:movieId/likes', movieIdValid, putLike);

// moviesRout.delete('/:movieId/likes', movieIdValid, deleteLike);

module.exports = moviesRout;
