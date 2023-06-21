const cardRouter = require('express').Router();

const {
  getCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, cardIdValidation } = require('../utils/validations');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCards);
cardRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);
module.exports = cardRouter;
