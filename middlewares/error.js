const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const errorHandler = (err, req, res, next) => {
  let error;

  switch (err.statusCode) {
    case 400:
      error = new BadRequestError('Ошибочный запрос');
      break;
    case 401:
      error = new UnauthorizedError('Пользователь не авторизован');
      break;
    case 403:
      error = new ForbiddenError('Доступ запрещен');
      break;
    case 404:
      error = new NotFoundError('Пользователь не найден');
      break;
    default:
      error = new ServerError('Ошибка на стороне сервера');
  }
  res.status(err.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
