const {
  createUser,
  getUser,
  addCoinsToUserAccount,
} = require("../services/services");
const {
  activate,
  logoutUser,
  refreshFunc
} = require("../services/user-service");
const { InternalServerError } = require("../middleware/error-handler");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const registerUser = async (req, res) => {
  try {
    const resultRegistration = await createUser(req.body);
    res.cookie("refreshToken", resultRegistration.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).send(resultRegistration.data);
  } catch (error) {
    res.status(error.status || 500).send({ error });
  }
};

const authUser = async (req, res) => {
  try {
    const resultAuth = await getUser(req.body);
    res.cookie("refreshToken", resultAuth.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).send(resultAuth.data);
  } catch (error) {
    res.status(error.status || 500).send({ error });
  }
};

const addCoin = async (req, res) => {
  try {
    const resultAddToCoin = await addCoinsToUserAccount(req.body);

    res.status(201).send(resultAddToCoin);
  } catch (error) {
    res.status(error.status || 500).send({ error });
  }
};

// Удаление refresh токена с базы данных
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const resultDeleteToken = await logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    return resultDeleteToken;
  } catch (error) {
    res.status(error.status || 500).send({ error });
  }
};

// Активация аккаунта
const activateUser = async (req, res) => {
  try {
    const activationLink = req.params.link;
    await activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const resultAccessToken = await refreshFunc(refreshToken);
    return resultAccessToken;
  } catch (error) {
    res.status(error.status || 500).send({ error });
  }
}

module.exports = {
  registerUser,
  authUser,
  addCoin,
  logout,
  activateUser,
  refresh,
};
