const cardRouter = require('express').Router();

const { getCards, createCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard)
module.exports = cardRouter;
