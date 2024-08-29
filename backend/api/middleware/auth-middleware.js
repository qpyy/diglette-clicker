const { validateAccessToken } = require("../services/token-service");
const { AccessTokenError } = require("./error-handler");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new AccessTokenError("Отсутствует заголовок авторизации");
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new AccessTokenError("Отсутствует access token");
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw new AccessTokenError("Недействительный access token");
    }

    req.user = userData;
    next();
  } catch (err) {
    next(err);
  }
};
