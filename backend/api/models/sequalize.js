const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Создаём подключение к базе данных
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
});


const Users = sequelize.define(
  'Users',
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);

(async () => {
  try {
    await Users.sync({ force: false }); // Синхронизируем модель users, если в базе данных не создана модель, написать true, после выполнения сразу написать false
    await sequelize.authenticate();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
})();

module.exports = {
  sequelize,
  Users
};