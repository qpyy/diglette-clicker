const bcrypt = require("bcryptjs");
const { Users } = require("../models/sequalize");
const jwt = require('jsonwebtoken');
const path = require('path');
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
      return { error: "Пользователь с такой почтой или логином уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email,
      login,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user: newUser.toJSON().login, token };
  } catch (error) {
    return error;
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
