const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[0-9A-Za-z]{6,16}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/,
};

const errorMessages = {
  requiredEmail: "Email is required.",
  invalidEmail: "Invalid email address.",
  requiredLogin: "Login is required.",
  invalidLogin: "Login must be 6-16 characters long and contain only letters and numbers.",
  requiredPassword: "Password is required.",
  invalidPassword: "Password must be 6+ characters long and contain both letters and numbers.",
  passwordMismatch: "Passwords are different.",
};

export { patterns, errorMessages };
