const cardRoutes = require('express').Router();
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validation');

const {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', validationCardId, deleteCard);
cardRoutes.post('/', validationCreateCard, createCard);
cardRoutes.put('/:cardId/likes', validationCardId, addLike);
cardRoutes.delete('/:cardId/likes', validationCardId, deleteLike);

module.exports = cardRoutes;
