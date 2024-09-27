import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useSignUp } from "../../hooks/useSignUp";
import useValidation from "../../hooks/useValidation";
import { validateSignUp } from "../../utils/validationRules";
import { StyledContainer, StyledForm, StyledTitle, Button, StyledDividerText } from "./styles";

const initialUserState = {
  email: "",
  login: "",
  password: "",
  repeatPassword: "",
};

const SignUpPage = () => {
  const [newUser, setNewUser] = useState(initialUserState);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { errors, validate } = useValidation(validateSignUp);
  const { signUp, isLoading, error } = useSignUp();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => setIsSnackbarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(newUser)) return;

    try {
      await signUp({ email: newUser.email, login: newUser.login, password: newUser.password });
      navigate(`/user/${newUser.login}`);
    } catch {
      setIsSnackbarOpen(true);
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
          errorMessage={errors.email}
          autoCompleteValue="off"
        />
        <CustomInput
          name="login"
          inputType="text"
          placeholderText="Your login..."
          handleChangeInput={handleChange}
          errorMessage={errors.login}
          autoCompleteValue="username"
        />
        <CustomInput
          name="password"
          inputType="password"
          placeholderText="Your password..."
          handleChangeInput={handleChange}
          errorMessage={errors.password}
          autoCompleteValue="current-password"
        />
        <CustomInput
          name="repeatPassword"
          inputType="password"
          placeholderText="Repeat your password..."
          handleChangeInput={handleChange}
          errorMessage={errors.repeatPassword}
          autoCompleteValue="off"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "CREATE ACCOUNT"}
        </Button>

        <StyledDividerText>Already have an account?</StyledDividerText>
        <CustomLink pathTo="/signin" linkText="SIGN IN" />
      </StyledForm>

      <CustomSnackbar
        open={isSnackbarOpen}
        message={error?.message || "Failed to sign up"}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2000}
      />
    </StyledContainer>
  );
};

export default SignUpPage;
