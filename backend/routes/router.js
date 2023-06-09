const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const { validationSignin, validationSignup } = require('../middlewares/validation');
const NotFound = require('../errors/NotFound');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);

router.use('/*', auth, (req, res, next) => {
  next(new NotFound('404: Not Found'));
});

module.exports = router;
