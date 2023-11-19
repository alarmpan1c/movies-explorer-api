require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const express = require('express');
const errorDes = require('./middlewares/errorsDes');
const { rout } = require('./routes/index');
const allowedCors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL : require('./utils/config');

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

app.use(rout);

app.use(errorLogger);

app.use(errors());
app.use(errorDes);
app.listen(3001, () => console.log('You here'));
