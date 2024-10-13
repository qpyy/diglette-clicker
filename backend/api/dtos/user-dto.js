class UserDto {
  id;
  email;
  login;
  coins;
  isActivated;
  level;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.login = model.login;
    this.coins = model.coins;
    this.isActivated = model.isActivated;
    this.level = model.level;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      coins: this.coins,
      isActivated: this.isActivated,
      level: this.level,
    }
  }

  toPayload() {
    return {
      id: this.id,
      login: this.login,
    }
  }

  toProfile() {
    return {
      id: this.id,
      login: this.login,
      coins: this.coins,
      level: this.level,
    }
  }
}

module.exports = UserDto;