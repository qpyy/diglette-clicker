const {
  createUser,
  getUser,
  addCoinsToUserAccount,
} = require("../services/services");

const registerUser = async (req, res) => {
  try {
    const resultRegistration = await createUser(req.body);
    res.cookie('refreshToken', resultRegistration.data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(201).send(resultRegistration.data);
  } catch (error) {
    res.status(400).send(error);
  }
};

const authUser = async (req, res) => {
  try {
    const resultAuth = await getUser(req.body);
    res.header(
      "Set-Cookie",
      `auth_token=${resultAuth.token}; HttpOnly; Secure; Max-Age=3600`
    );
    res.status(201).send(resultAuth);

  } catch (error) {
    console.log('Произошла ошибка:', error.name, '-', error.message);
    console.log('Трассировка стека:', error.stack);
    res.status(400).send("Error authorization");
  };
};

const addCoin = async (req, res) => {
  try {
    const resultAddToCoin = await addCoinsToUserAccount(req.body);

    res.status(201).send(resultAddToCoin);
  } catch (error) {
    console.log('Произошла ошибка:', error.name, '-', error.message);
    console.log('Трассировка стека:', error.stack);
    res.status(400).send("Error authorization");
  };
};
// Удаление refresh токена с базы данных
const logout = async (req, res) => {
  try {

  } catch (error) {

  }
}
// Активация аккаунта
const activate = async (req, res) => {
  try {

  } catch (error) {

  }
}
// Созадние refresh токена
const refresh = async (req, res) => {
  try {

  } catch (error) {

  }
}


module.exports = {
  registerUser,
  authUser,
  addCoin,
  logout,
  activate,
  refresh
}