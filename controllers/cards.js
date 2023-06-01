const Card = require('../models/card');

getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

createCards = (req, res) => {
  console.log(req.body)
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    });
};

deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Неправильный id' })
      } else {
        res.status(200).send({ message: 'карточка удалена' })
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((user) => {
      res.status(200).send(user.likes)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((user) => {
      res.status(200).send(user.likes)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard
}