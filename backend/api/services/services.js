const bcrypt = require("bcryptjs");
const { Users, sequelize } = require("../models/sequalize");
const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { mailService } = require('./mail-service');
const { tokenService, saveToken } = require('./token-service');
const UserDto = require("../dtos/user-dto");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });


const getUser = async (body) => {
  try {
    const { login, password } = body;
    console.log(body);
    const user = await Users.findOne({ where: { login } });

    if (!user) {
      return { error: "Неправильный логин или пароль" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: "Неправильный логин или пароль" };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user: user.toJSON().login, token };
  } catch (error) {
    return error;
  }
};

const createUser = async (body) => {
  try {
    const { email, login, password } = body;

    const existingUser = await Users.findOne({
      where: {
        email: email,
        login: login
      }
    });

    if (existingUser) {
      return {
        statusCode: 400,
        error: "Пользователь с такой почтой или логином уже существует"
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuidv4();

    const newUser = await Users.create({
      email,
      login,
      password: hashedPassword,
      activationLink
    });

    try {
      await mailService(email, `${process.env.API_URL}/activate/${activationLink}`);
      // Обработка успешного ответа
      const userDto = new UserDto(newUser);
      const tokens = await tokenService(userDto.toJSON());

      await saveToken(userDto.toJSON().id, tokens.refreshToken);

      return {
        statusCode: 201,
        data: {
          ...tokens,
          user: userDto
        }
      };
    } catch (err) {
      console.error('Error in mail service:', err);
      throw new Error('Failed to send activation email');
    }

  } catch (error) {
    return {
      statusCode: 500,
      error: 'Ошибка при создании пользователя',
      message: error.message
    };
  }
};


const addCoinsToUserAccount = async (body) => {
  try {
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

  } catch (error) {
    if (error.message.includes('не найден')) {
      return { statusCode: 404, error: 'Not Found', message: error.message };
    } else {
      return { statusCode: 500, error: 'Internal Server Error', message: error.message };
    }
  }
}


module.exports = { getUser, createUser, addCoinsToUserAccount };
