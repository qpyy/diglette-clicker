import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useSignUp } from "../../hooks/useSignUp";
import { errorMessages, patterns } from "../../constants/validationConstants";
import { StyledContainer, StyledForm, StyledTitle, Button, StyledDividerText } from "./styles";

const initialUserState = {
  email: "",
  login: "",
  password: "",
  repeatPassword: "",
};

const initialErrorState = {
  email: "",
  login: "",
  password: "",
  repeatPassword: "",
};

const SignUpPage = () => {
  const [newUser, setNewUser] = useState(initialUserState);
  const [errorsMessage, setErrorsMessage] = useState(initialErrorState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { signUp, isLoading, error } = useSignUp();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const validate = () => {
    const { email, login, password, repeatPassword } = newUser;
    const newErrors = { ...initialErrorState };

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

    setErrorsMessage(newErrors);
    return !newErrors.email && !newErrors.login && !newErrors.password && !newErrors.repeatPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signUp({ email: newUser.email, login: newUser.login, password: newUser.password });
      navigate(`/user/${newUser.login}`);
    } catch {
      setOpenSnackbar(true);
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>Sign Up</StyledTitle>
        <CustomInput
          name="email"
          inputType="email"
          placeholderText="Your email..."
          handleChangeInput={handleChange}
          errorMessage={errorsMessage.email}
          autoCompleteValue="off"
        />
        <CustomInput
          name="login"
          inputType="text"
          placeholderText="Your login..."
          handleChangeInput={handleChange}
          errorMessage={errorsMessage.login}
          autoCompleteValue="username"
        />
        <CustomInput
          name="password"
          inputType="password"
          placeholderText="Your password..."
          handleChangeInput={handleChange}
          errorMessage={errorsMessage.password}
          autoCompleteValue="current-password"
        />
        <CustomInput
          name="repeatPassword"
          inputType="password"
          placeholderText="Repeat your password..."
          handleChangeInput={handleChange}
          errorMessage={errorsMessage.repeatPassword}
          autoCompleteValue="off"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "CREATE ACCOUNT"}
        </Button>

        <StyledDividerText>Already have an account?</StyledDividerText>
        <CustomLink pathTo="/signin" linkText="SIGN IN" />
      </StyledForm>

      <CustomSnackbar
        open={openSnackbar}
        message={error?.message || "Failed to sign up"}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2000}
      />
    </StyledContainer>
  );
};

export default SignUpPage;
