const User = require('../models/user');
const {
  badRequest,
  serverError,
  createRequest,
  notFound,
  goodRequest,
} = require('../utils/constants'); // Статусы и сообщения об ошибке

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(goodRequest.status).send({ data: users });
    })
    .catch(() => {
      res.status(serverError.status).send({ message: serverError.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      }
      res.status(serverError.status).send({ message: serverError.message });
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(createRequest.status).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      }
      res.status(serverError.status).send({ message: serverError.message });
    });
};

const opt = { new: true, runValidators: true };

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, opt)
    .then((user) => {
      res.status(goodRequest.status).send(user);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      }
      res.status(serverError.status).send({ message: serverError.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateProfile,
  updateAvatar,
};
