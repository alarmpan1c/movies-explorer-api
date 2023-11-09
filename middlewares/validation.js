const { celebrate, Joi } = require('celebrate');

const urlReg = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;
const imageUrlReg = /^\/uploads\/[a-zA-Z0-9_]+\.[a-zA-Z]{3,4}$/;

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const userIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const movieValid = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(imageUrlReg),
    trailerLink: Joi.string().required().pattern(urlReg),
    thumbnail: Joi.string().required().pattern(imageUrlReg),
    movieId: Joi.number().required(),
  }),
});

const movieIdValid = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginValid,
  registerValid,
  userValid,
  userIdValid,
  movieValid,
  movieIdValid,
};
