const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => validator.isURL(avatar),
      message: 'Здесь должна быть ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => { validator.isEmail(email); },
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized('Incorrect email or password'),
        );
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(
              new Unauthorized('Incorrect email or password'),
            );
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
