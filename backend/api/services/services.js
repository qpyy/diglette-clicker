const bcrypt = require("bcryptjs");
const { Users } = require("../models/sequalize");
const { Op } = require('sequelize');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { mailService } = require('./mail-service');
const { tokenService, saveToken } = require("./token-service");
const { AuthorizationError, BadRequestError, VerifyError } = require("../middleware/error-handler");
const UserDto = require("../dtos/user-dto");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const getUser = async (body) => {
  const { login, password } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    throw new AuthorizationError('Неправильный логин или пароль');
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new AuthorizationError('Неправильный логин или пароль');
  };

  const userDto = new UserDto(existingUser);

  if (!userDto.isActivated) {
    throw new VerifyError('Почта не прошла верификацию, активируйте свой профиль перейдя по ссылке отправленной вам на почту');
  }

  const tokens = await tokenService(userDto.toPayload());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 200,
    data: {
      ...tokens
    }
  };
}

const createUser = async (body) => {
  const { email, login, password } = body;

  const existingUser = await Users.findOne({
    where: {
      [Op.or]: [
        { email: email },
        { login: login }
      ]
    }
  });

  if (existingUser !== null) {
    throw new BadRequestError('Пользователь с таким логином или почтой уже зарегистрирован');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const activationLink = uuidv4();

  const newUser = await Users.create({
    email,
    login,
    password: hashedPassword,
    activationLink,
    coins: 0,
    level: 0
  });

  await mailService(email, `${process.env.API_URL}/activate/${activationLink}`);

  const userDto = new UserDto(newUser);
  const tokens = await tokenService(userDto.toPayload());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 201,
    data: {
      ...tokens
    }
  };
};

const addCoinsToUserAccount = async (body) => {

  const { login, coin } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    throw new BadRequestError(`Пользователь со следующим логином ${login} не найден`, 400);
  }

  if (!existingUser.isActivated) {
    throw new VerifyError('Почта не прошла верификацию, активируйте свой профиль перейдя по ссылке отправленной вам на почту');
  }

  existingUser.coins += coin;

  await existingUser.save();

  return existingUser.coins;
}

module.exports = { getUser, createUser, addCoinsToUserAccount };
