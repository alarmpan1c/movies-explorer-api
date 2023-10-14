require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const express = require('express');
const usersRout = require('./routes/users');
const moviesRout = require('./routes/movies');
const { login } = require('./controllers/users');
const { makeUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errorDes = require('./middlewares/errorsDes');
const { loginValid, registerValid } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const allowedCors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { DB_URL } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(express.json());
app.use(express.urlencoded());

app.use(requestLogger);
app.use(helmet());
app.use(allowedCors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);

app.post('/signin', loginValid, login);
app.post('/signup', registerValid, makeUser);
app.use('/users', auth, usersRout);
app.use('/movies', auth, moviesRout);
app.use('*', (req, res, next) => next(new NotFound('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(errorDes);
app.listen(3000, () => console.log('You here'));
