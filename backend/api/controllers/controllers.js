const {
  createUser,
  getUser,
  addCoinsToUserAccount,
} = require("../services/services");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const resultRegistration = await createUser(req.body);
    res.header(
      "Set-Cookie",
      `auth_token=${resultRegistration.token}; HttpOnly; Secure; Max-Age=3600`
    );
    res.status(201).send(resultRegistration);
  } catch (error) {
    res.status(400).send("Error registration");
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

module.exports = {
  registerUser,
  authUser,
  addCoin
}