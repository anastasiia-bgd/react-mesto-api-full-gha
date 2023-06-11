const cardSchema = require('../models/card');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    // .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardSchema
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Cannot be found'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden('Card cannot be deleted'));
      }
      return card.deleteOne().then(() => res.send({ message: 'Card was deleted' }));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  cardSchema
    .create({
      name,
      link,
      owner,
    })
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Incorrect data'));
      }
      return next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Сannot be found'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Incorrect data'));
      }
      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Сannot be found'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequest('Incorrect data'));
      }
      return next(err);
    });
};
