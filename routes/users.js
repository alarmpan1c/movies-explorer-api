const usersRout = require('express').Router();
const { updateProfile } = require('../controllers/users');
const { infoUser } = require('../controllers/users');
const { userValid } = require('../middlewares/validation');

usersRout.get('/me', infoUser);

usersRout.patch('/me', userValid, updateProfile);

module.exports = usersRout;
