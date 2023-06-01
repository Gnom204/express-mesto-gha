const User = require('../models/user');

getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: 'Пользователь не найден' })
      }
      res.status(200).send({ data: users })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    });
};

getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' })
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    });
};

createUsers = (req, res) => {
  console.log(req.body)
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    });
};

updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name: name,
    about: about
  })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar: avatar
  })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateProfile,
  updateAvatar,
}
