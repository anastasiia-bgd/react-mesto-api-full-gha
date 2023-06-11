require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/router');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());
mongoose.connect(MONGO_URL);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.use(requestLogger);
app.use('/', router);
// app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const {
    status = 500,
    message,
  } = error;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
