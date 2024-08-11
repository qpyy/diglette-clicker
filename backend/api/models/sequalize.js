const { Sequelize, DataTypes, BOOLEAN } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Создаём подключение к базе данных
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Модель TokenSchema
const TokenSchema = sequelize.define(
  "TokenSchema",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

(async () => {
  try {
    await Users.sync({ force: true }); // Синхронизируем модель users, если в базе данных не создана модель, написать true, после выполнения сразу написать false
    await TokenSchema.sync({ force: true });
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
})();

module.exports = {
  sequelize,
  Users,
  TokenSchema,
};
