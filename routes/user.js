const userRouter = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
module.exports = userRouter;
