const { validateAccessToken } = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      const error = new Error();
      error.status = 401;
      error.message = "Отсутствует заголовок авторизации";
      throw error;
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      const error = new Error();
      error.status = 401;
      error.message = "Отсутствует access token";
      throw error;
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      const error = new Error();
      error.status = 401;
      error.message = "Недействительный access token";
      throw error;
    }

    req.user = userData;
    next();
  } catch (e) {
    const error = new Error();
    error.status = 500;
    error.message = "Произошла ошибка, сервис временно недоступен";
    throw error;
  }
};
