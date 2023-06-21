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
} = require('../utils/constants'); // Статусы и сообщения об ошибке
const ServerError = require('../errors/server-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .orFail()
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
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
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { userId } = req.body;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFound.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new ServerError(serverError.message);
      } else {
        res.status(goodRequest.status).send({ data: users });
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFound.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch(next);
};

const createUsers = (req, res, next) => {
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
          if (user) {
            res.status(createRequest.status).send({ data: user.toJSON() });
          } else {
            throw new BadRequestError(badRequest.message);
          }
        })
        .catch(next);
    })
    .catch(next);
};

const opt = { new: true, runValidators: true };

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, opt)
    .then((user) => {
      if (!user) {
        throw new BadRequestError(badRequest.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, opt)
    .then((user) => {
      if (!user) {
        throw new BadRequestError(badRequest.message);
      } else {
        res.status(goodRequest.status).send(user);
      }
    })
    .catch(next);
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
