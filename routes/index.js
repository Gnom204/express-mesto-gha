const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const { login, createUsers } = require('../controllers/users');
const defenseRouter = require('../middlewares/auth');
const { loginValidation, createUserValidation } = require('../utils/joiValidation');

const router = express.Router();

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUsers);

router.use(defenseRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
