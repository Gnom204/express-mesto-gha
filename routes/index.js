const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const { login, createUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signUpValidation, sigInValidation } = require('../utils/validations');

const router = express.Router();

router.post('/signin', sigInValidation, login);
router.post('/signup', signUpValidation, createUsers);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
