const bcrypt = require("bcryptjs");
const { Users } = require("../models/sequalize");
const { Op } = require("sequelize");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { mailService } = require("./mail-service");
const { tokenService, saveToken } = require("./token-service");
const {
  AuthorizationError,
  BadRequestError,
  VerifyError,
} = require("../middleware/error-handler");
const UserDto = require("../dtos/user-dto");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const getUser = async (body) => {
  const { login, password } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    throw new AuthorizationError("Неправильный логин или пароль");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new AuthorizationError("Неправильный логин или пароль");
  }

  const userDto = new UserDto(existingUser);

  if (!userDto.isActivated) {
    throw new VerifyError(
      "Почта не прошла верификацию, активируйте свой профиль перейдя по ссылке отправленной вам на почту"
    );
  }

  const tokens = await tokenService(userDto.toJSON());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 200,
    data: {
      ...tokens,
    },
  };
};

const createUser = async (body) => {
  const { email, login, password } = body;

  const existingUser = await Users.findOne({
    where: {
      [Op.or]: [{ email: email }, { login: login }],
    },
  });

  if (existingUser !== null) {
    throw new BadRequestError(
      "Пользователь с таким логином или почтой уже зарегистрирован"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const activationLink = uuidv4();

  const newUser = await Users.create({
    email,
    login,
    password: hashedPassword,
    activationLink,
    coins: 0,
    level: 0,
  });

  await mailService(email, `${process.env.API_URL}/activate/${activationLink}`);

  const userDto = new UserDto(newUser);
  const tokens = await tokenService(userDto.toJSON());

  await saveToken(userDto.toJSON().id, tokens.refreshToken);

  return {
    status: 201,
    data: {
      ...tokens,
    },
  };
};

const addCoinsToUserAccount = async (body) => {
  const { login, coin } = body;

  const existingUser = await Users.findOne({ where: { login } });

  if (!existingUser) {
    throw new BadRequestError(
      `Пользователь со следующим логином ${login} не найден`,
      400
    );
  }

  console.log(existingUser.level);

  existingUser.coins += coin;
  existingUser.experience += coin / 10;

  const levelUpThreshold = (level) => 100 * Math.pow(1.1, level - 1);

  const calculateExperienceToNextLevel = (experience, level) => {
    let currentExperience = experience;
    let currentLevel = level;

    while (currentExperience >= Math.ceil(levelUpThreshold(currentLevel + 1))) {
      currentExperience -= Math.ceil(levelUpThreshold(currentLevel));
      currentLevel++;
    }

    const experienceToNextLevel = Math.ceil(levelUpThreshold(currentLevel + 1)) - currentExperience;
    const experienceCurrentLevel = currentExperience;

    return {
      level: currentLevel,
      experienceToNextLevel: Math.max(0, experienceToNextLevel),
      experienceCurrentLevel: Math.max(0, experienceCurrentLevel)
    };
  };




  const levelAndExperince = calculateExperienceToNextLevel(existingUser.experience, existingUser.level);

  await existingUser.save();

  return {
    coins: existingUser.coins,
    ...levelAndExperince
  };
};

module.exports = { getUser, createUser, addCoinsToUserAccount };
