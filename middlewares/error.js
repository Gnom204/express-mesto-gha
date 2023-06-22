const errorHandler = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'Ошибка на стороне сервера' : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
