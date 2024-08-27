const { validateAccessToken } = require("../services/token-service");
const { AccessTokenError } = require("./error-handler");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("1");

    if (!authorizationHeader) {
      throw new AccessTokenError("Отсутствует заголовок авторизации");
    }
    console.log("2");

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new AccessTokenError("Отсутствует access token");
    }
    console.log("3");

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw new AccessTokenError("Недействительный access token");
    }

    console.log("4");
    req.user = userData;
    next(); // Вызываем функцию next(), чтобы middleware мог продолжить выполнение
  } catch (err) {
    console.log("Ошибка access", err);
    next(err); // Передаем ошибку в next middleware
  }
};
