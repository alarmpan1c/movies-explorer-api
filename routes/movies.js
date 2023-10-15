const moviesRout = require('express').Router();
const { getMovies } = require('../controllers/movies');
const { makeMovie } = require('../controllers/movies');
const { deleteMovieId } = require('../controllers/movies');
const {
  movieValid,
  movieIdValid,
} = require('../middlewares/validation');

moviesRout.get('/', getMovies);

moviesRout.post('/', movieValid, makeMovie);

moviesRout.delete('/:_id', movieIdValid, deleteMovieId);

module.exports = moviesRout;
