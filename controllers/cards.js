const Card = require('../models/card');
const {
  badRequest,
  serverError,
  createRequest,
  notFound,
  goodRequest,
} = require('../utils/constants'); // Статусы и сообщения об ошибке

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(goodRequest.status).send({ data: cards });
    })
    .catch(() => {
      res.status(serverError.status).send({ message: serverError.message });
    });
};

const createCards = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(createRequest.status).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.status).send({ message: badRequest.message });
      } else {
        res.status(serverError.status).send({ message: serverError.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(goodRequest.status).send({ message: goodRequest.message });
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(200).send(card.likes);
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(200).send(card.likes);
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

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
