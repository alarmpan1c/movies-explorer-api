const rout = require('express').Router();
const { login, makeUser } = require('../controllers/users');
const { loginValid, registerValid } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const { NotFound } = require('../errors/NotFound');

const usersRout = require('./users');
const moviesRout = require('./movies');

rout.post('/signin', loginValid, login);
rout.post('/signup', registerValid, makeUser);

rout.use('/users', auth, usersRout);
rout.use('/movies', auth, moviesRout);

rout.use('*', auth, (req, res, next) => next(new NotFound('Страница не найдена')));

module.exports = {
  rout,
};
