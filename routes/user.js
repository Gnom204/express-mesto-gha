const userRouter = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');
const { updateProfileValidation, getUserIdValidation, updateAvatarValidation } = require('../utils/validations');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', getUserIdValidation, getUserById);
userRouter.patch('/me', updateProfileValidation, updateProfile);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);
module.exports = userRouter;
