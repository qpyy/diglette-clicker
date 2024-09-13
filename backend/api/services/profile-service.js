const fs = require("fs");
const path = require("path")
const UserDto = require("../dtos/user-dto");
const { NotFoundUser } = require("../middleware/error-handler");
const { Users } = require("../models/sequalize");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const getProfileUsers = async (login) => {
  try {
    const existingUser = await Users.findOne({ where: { login: login } });
    if (!existingUser) {
      throw new NotFoundUser("User not found");
    }
    const photoPath = path.join(__dirname, '../images/skins/', `lvl-${existingUser.dataValues.level}.svg`);

    // Проверка, существует ли такой скин
    if (fs.existsSync(photoPath)) {
      // Формируем URL изображения
      const imageUrl = `${process.env.API_URL}/source/lvl-${existingUser.dataValues.level}.svg`;

      const userDto = new UserDto(existingUser);
      return {
        ...userDto.toProfile(),
        image: imageUrl,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};




module.exports = { getProfileUsers };