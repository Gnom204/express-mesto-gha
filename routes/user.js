const userRouter = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');
const { updateProfileValidation, updateAvatarValidation, userIdValidation } = require('../utils/joiValidation');

userRouter.get('/', getUsers);
userRouter.get('/:userId', userIdValidation, getUserById);
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateProfileValidation, updateProfile);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);
module.exports = userRouter;
