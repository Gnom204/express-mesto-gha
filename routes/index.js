const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const { login, createUsers } = require('../controllers/users');
const defenseRouter = require('../middlewares/auth');

const router = express.Router();

router.post('/signin', login);
router.post('/signup', createUsers);

router.use(defenseRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
