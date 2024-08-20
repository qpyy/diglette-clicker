const { Users } = require("../models/sequalize");
const { removeToken, validateRefreshToken, tokenService } = require("./token-service");
const UserDto = require("../dtos/user-dto");
const { AuthenticationError, InternalServerError } = require("../middleware/error-handler");

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
    console.log(error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR", 500);
  }
};

const logoutUser = async (refreshToken) => {
  try {
    const token = await removeToken(refreshToken);
    return token;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR", 500);
  }
};

const refreshFunc = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new AuthenticationError("Refresh token unavailable", 403);
    }
    const userData = await validateRefreshToken(refreshToken);

    if (!userData) {
      throw new AuthenticationError("Refresh token expired", 403);
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
