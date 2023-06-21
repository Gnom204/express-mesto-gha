const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const badRequest = {
  status: 400,
  message: 'переданы невалидные данные',
};

const notFound = {
  status: 404,
  message: 'Объект не найден',
};

const serverError = {
  status: 500,
  message: 'Произошла ошибка',
};

const unauthorized = {
  status: 401,
  message: 'Не авторизован',
};

const goodRequest = {
  status: 200,
  message: 'Успешный запрос',
};

const createRequest = {
  status: 201,
  message: 'Объект создан',
};

const secretKey = 'MY-MEGA-SECRET-KEY';

module.exports = {
  badRequest,
  serverError,
  goodRequest,
  createRequest,
  notFound,
  secretKey,
  unauthorized,
  regex,
};
