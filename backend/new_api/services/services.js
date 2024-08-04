const bcrypt = require("bcryptjs");
const { Users } = require("../models/sequalize");
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

module.exports = { getUser, createUser };
