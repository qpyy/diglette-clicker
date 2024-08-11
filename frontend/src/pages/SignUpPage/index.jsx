import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useSignUp } from "../../hooks/useSignUp";
import { StyledContainer, StyledForm, StyledTitle, Button, StyledDividerText } from "./styles";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    login: "",
    password: "",
  });
  const [errorsMessage, setErrorsMessage] = useState({ email: "", login: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { signUp, isLoading, error } = useSignUp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateForm = async (e) => {
    e.preventDefault();
    setErrorsMessage({ email: "", login: "", password: "" });
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[0-9A-Za-z]{6,16}$/;
    const { email, login, password } = formData;

    if (!email.trim()) {
      setErrorsMessage({ email: "Email is required." });
      return;
    }

    if (!emailPattern.test(email)) {
      setErrorsMessage({ email: "Invalid email address." });
      return;
    }

    if (!login.trim()) {
      setErrorsMessage({ login: "Login is required." });
      return;
    }

    if (!usernamePattern.test(login)) {
      setErrorsMessage({
        login: "Login must be 6-16 characters long and contain only letters and numbers.",
      });
      return;
    }

    if (!password.trim()) {
      setErrorsMessage({ password: "Password is required." });
      return;
    }

    if (!passwordPattern.test(password)) {
      setErrorsMessage({
        password: "Password must be 6+ characters long and contain both letters and numbers.",
      });
      return;
    }

    try {
      console.log(formData);
      await signUp(formData);
      navigate("/profile");
    } catch {
      setOpenSnackbar(true);
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={validateForm}>
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
