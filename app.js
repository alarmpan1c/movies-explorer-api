require('dotenv').config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const express = require('express');
const usersRout = require('./routes/users');
const moviesRout = require('./routes/movies');
console.log(moviesRout);
const { login } = require('./controllers/users');
const { makeUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errorDes = require('./middlewares/errorsDes');
const { loginValid, registerValid } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const allowedCors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(express.json());
app.use(express.urlencoded());

app.use(requestLogger);
app.use(allowedCors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValid, login);
app.post('/signup', registerValid, makeUser);
app.use('/users', auth, usersRout);
app.use('/movies', auth, moviesRout);
app.use('*', (req, res, next) => next(new NotFound('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(errorDes);
app.listen(3000, () => console.log('You here'));
