class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }

  toJSON() {
    return {
      email: this.email,
      id: this.id,
      isActivated: this.isActivated
    }

  }
}

module.exports = UserDto;