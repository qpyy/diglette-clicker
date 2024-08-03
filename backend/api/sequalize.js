const { Sequelize, DataTypes } = require("sequelize");

// Создаём подключение к базе данных
const sequelize = new Sequelize(
  "postgresql://postgres:Edega2003@host.docker.internal:5432/clicker"
);

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Позже добавить администратора

// Синхронизация модели с базой данных
(async () => {
  try {
    await Users.sync({ force: false }); // Синхронизируем модель users
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
})();

module.exports = {
  sequelize,
  Users,
};
