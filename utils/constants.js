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

const goodRequest = {
  status: 200,
  message: 'Успешный запрос',
};

const createRequest = {
  status: 201,
  message: 'Объект создан',
};

module.exports = {
  badRequest,
  serverError,
  goodRequest,
  createRequest,
  notFound,
};
