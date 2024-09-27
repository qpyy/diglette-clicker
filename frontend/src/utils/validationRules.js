import { errorMessages, patterns } from "../constants/validationConstants";

const validateSignUp = (values) => {
  const { email, login, password, repeatPassword } = values;
  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = errorMessages.requiredEmail;
  } else if (!patterns.email.test(email)) {
    newErrors.email = errorMessages.invalidEmail;
  }

  if (!login.trim()) {
    newErrors.login = errorMessages.requiredLogin;
  } else if (!patterns.username.test(login)) {
    newErrors.login = errorMessages.invalidLogin;
  }

  if (!password.trim()) {
    newErrors.password = errorMessages.requiredPassword;
  } else if (!patterns.password.test(password)) {
    newErrors.password = errorMessages.invalidPassword;
  }

  if (password !== repeatPassword) {
    newErrors.repeatPassword = errorMessages.passwordMismatch;
  }

  return newErrors;
};

const validateSignIn = (values) => {
  const { login, password } = values;
  const newErrors = {};

  if (!login.trim()) {
    newErrors.login = errorMessages.requiredLogin;
  } else if (!patterns.username.test(login)) {
    newErrors.login = errorMessages.invalidLogin;
  }

  if (!password.trim()) {
    newErrors.password = errorMessages.requiredPassword;
  } else if (!patterns.password.test(password)) {
    newErrors.password = errorMessages.invalidPassword;
  }

  return newErrors;
};

export { validateSignUp, validateSignIn };
