const jwt = require('jsonwebtoken');
const path = require('path');
const { TokenSchema } = require("../models/sequalize");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const tokenService = async (payload) => {
  console.log(payload);
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
  return {
    accessToken,
    refreshToken
  };
};

const saveToken = async (userId, refreshToken) => {
  console.log(userId);
  const tokenData = await TokenSchema.findOne({ userId: userId });
  if (tokenData) {
    TokenSchema.refreshToken = refreshToken;
    return tokenData.save();
  };
  const token = await TokenSchema.create({ userId: userId, refreshToken });
  return token;
};

module.exports = { tokenService, saveToken };