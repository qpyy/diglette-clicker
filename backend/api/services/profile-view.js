const UserDto = require("../dtos/user-dto");
const { NotFoundUser } = require("../middleware/error-handler");
const { Users } = require("../models/sequalize");

const getProfileUsers = async (login) => {
  try {
    // console.log("Проверка логина в базе данных", login);
    const existingUser = await Users.findOne({ where: { login: login } });
    if (!existingUser) {
      throw new NotFoundUser("User not found");
    }
    // console.log("Результат поиска", existingUser);
    const userDto = new UserDto(existingUser);
    return userDto.toProfile();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { getProfileUsers };