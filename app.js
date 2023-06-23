const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error');
const { notFound } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(() => {
  throw new NotFoundError(notFound.message);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
