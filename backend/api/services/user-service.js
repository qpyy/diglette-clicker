// const { refresh } = require('../controllers/controllers');
const { Users } = require("../models/sequalize");
const {
  removeToken,
  validateRefreshToken,
  findToken,
  tokenService,
  saveToken,
} = require("./token-service");
const UserDto = require("../dtos/user-dto");

const activate = async (activationLink) => {
  try {
    const user = await Users.findOne({
      where: {
        activationLink: activationLink,
      },
    });
    user.isActivated = true;
    await user.save();
  } catch (error) {
    return console.log(error);
  }
};

const logoutUser = async (refreshToken) => {
  try {
    const token = await removeToken(refreshToken);
    return token;
  } catch (error) {
    return console.log(error);
  }
};

const refreshFunc = async (refreshToken) => {
  try {
    if (!refreshToken) {
      const error = new Error();
      error.status = 403;
      error.message = "Refresh token unavailable";
      throw error;
    }
    const userData = await validateRefreshToken(refreshToken);

    if (!userData) {
      const error = new Error();
      error.status = 403;
      error.message = "Refresh token expired";
      throw error;
    }

    const existingUser = await Users.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(existingUser);
    const newAccessToken = await tokenService(userDto.toJSON());

    return {
      accessToken: newAccessToken.accessToken,
      user: userDto,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { activate, logoutUser, refreshFunc };
