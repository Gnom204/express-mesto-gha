// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  badRequest,
  serverError,
  createRequest,
  notFound,
  goodRequest,
  secretKey,
  unauthorized,
} = require('../utils/constants'); // Статусы и сообщения об ошибке

const login = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .orFail()
    .then(async (user) => {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: 3600,
          httpOnly: true,
        }).send(user.toJSON());
      } else {
        throw new BadRequestError('Неправильные email или пароль');
      }
    })
    .catch((err) => {
      res.status(unauthorized.status).send(err.message);
    });
};

const getUserInfo = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFound.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      } else {
        res.status(serverError.status).send({ message: serverError.message });
      }
    });
};

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
        throw new NotFoundError(notFound.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      } else {
        res.status(serverError.status).send({ message: serverError.message });
      }
    });
};

const createUsers = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.status(createRequest.status).send({ data: user.toJSON() });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(badRequest.status).send({ message: badRequest.message });
          } else {
            res.status(serverError.status).send({ message: serverError.message });
          }
        });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      } else {
        res.status(serverError.status).send({ message: serverError.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, opt)
    .then((user) => {
      res.status(goodRequest.status).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      } else {
        res.status(serverError.status).send({ message: serverError.message });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
