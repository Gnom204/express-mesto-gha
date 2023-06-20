const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { notFound } = require('./utils/constants');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use(router);

app.use((req, res) => {
  res.status(notFound.status).send({ message: notFound.message });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
