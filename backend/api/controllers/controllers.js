const { createUser, getUser, addCoinsToUserAccount } = require("../services/services");
const { activate, logoutUser, refreshFunc } = require("../services/user-service");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const handleErrorResponse = (res, error, defaultStatus = "No name error") => {
  res.status(error.status || defaultStatus).send(error);
};

const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    httpOnly: true,
  });
};

const registerUser = async (req, res) => {
  try {
    const { data } = await createUser(req.body);
    setRefreshTokenCookie(res, data.refreshToken);
    res.status(201).send(data);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const authUser = async (req, res) => {
  try {
    const { data } = await getUser(req.body);
    setRefreshTokenCookie(res, data.refreshToken);
    res.status(200).send(data);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const addCoin = async (req, res) => {
  try {
    const result = await addCoinsToUserAccount(req.body);
    res.status(201).send(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const activateUser = async (req, res) => {
  try {
    const activationLink = req.params.link;
    await activate(activationLink);
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const resultAccessToken = await refreshFunc(refreshToken);
    res.status(200).send(resultAccessToken);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = {
  registerUser,
  authUser,
  addCoin,
  logout,
  activateUser,
  refresh,
};