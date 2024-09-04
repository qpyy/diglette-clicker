const jwt = require("jsonwebtoken");
const path = require("path");
const { TokenSchema } = require("../models/sequalize");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const tokenService = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "20m" });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenSchema.findOne({ userId: userId });
  if (tokenData) {
    TokenSchema.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await TokenSchema.create({ userId: userId, refreshToken });
  return token;
};

const removeToken = async (refreshToken) => {
  const tokenData = await TokenSchema.destroy({
    where: {
      refreshToken,
    },
  });

  if (tokenData === 1) return refreshToken;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return userData;
  } catch (error) {
    return null;
  }
};

const findToken = async (refreshToken) => {
  const tokenData = await TokenSchema.findOne({ refreshToken });
  return tokenData;
};

module.exports = {
  tokenService,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
