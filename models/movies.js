const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (url) => url.match(/https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/),
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (url) => url.match(/https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/),
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (url) => url.match(/https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/),
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('movie', movieSchema);
