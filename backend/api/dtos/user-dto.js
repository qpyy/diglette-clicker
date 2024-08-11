class UserDto {
  id;
  email;
  login;
  coins;
  isActivated;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.login = model.login;
    this.coins = model.coins;
    this.isActivated = model.isActivated;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      coins: this.coins,
      isActivated: this.isActivated
    }

  }
}

module.exports = UserDto;