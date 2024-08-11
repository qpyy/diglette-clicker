const bcrypt = require("bcryptjs");
const { Users } = require("../models/sequalize");
const { Op } = require('sequelize');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { mailService } = require('./mail-service');
const { tokenService, saveToken } = require('./token-service');
const UserDto = require("../dtos/user-dto");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const getUser = async (body) => {
  const { login, password } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    const error = new Error();
    error.status = 403;
    error.message = "Неправильный логин или пароль";
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    const error = new Error();
    error.status = 403;
    error.message = "Неправильный логин или пароль";
    throw error;
  };

  const userDto = new UserDto(existingUser);
  const tokens = await tokenService(userDto.toJSON());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 200,
    data: {
      ...tokens,
      user: userDto
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
    const error = new Error();
    error.status = 409;
    error.message = "Пользователь с таким логином или почтой уже зарегистрирован";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const activationLink = uuidv4();

  const newUser = await Users.create({
    email,
    login,
    password: hashedPassword,
    activationLink,
    coins: 0
  });

  await mailService(email, `${process.env.API_URL}/activate/${activationLink}`);

  const userDto = new UserDto(newUser);
  const tokens = await tokenService(userDto.toJSON());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 201,
    data: {
      ...tokens,
      user: userDto
    }
  };
};

const addCoinsToUserAccount = async (body) => {

  const { login, coin } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    throw new Error(`Пользователь со следующим логином ${login} не найден`);
  }

  if (coin <= 0) {
    throw new Error('Количество монет должно быть положительным числом');
  }

  existingUser.coins += coin;

  await existingUser.save();

  return existingUser.coins;
}

module.exports = { getUser, createUser, addCoinsToUserAccount };
