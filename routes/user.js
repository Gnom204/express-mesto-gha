const router = require('express').Router();

const {
  getUsers, createUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUsers);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
