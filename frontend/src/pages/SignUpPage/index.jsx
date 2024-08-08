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
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { signUp, isLoading, error } = useSignUp();
  const navigate = useNavigate();

  const validateForm = ({ email, password, login }) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const loginPattern = /^[0-9A-Za-z]{6,16}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    const errors = {};
    setErrors({});

    if (!email.trim()) {
      errors.email = "Email is required.";
      setErrors(errors);
      return errors;
    }

    if (!emailPattern.test(email)) {
      errors.email = "Invalid email address.";
      setErrors(errors);
      return errors;
    }

    if (!login.trim()) {
      errors.login = "Login is required.";
      setErrors(errors);
      return errors;
    }

    if (!loginPattern.test(login)) {
      errors.login = "Login must be 6-16 characters long and contain only letters and numbers.";
      setErrors(errors);
      return errors;
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
      setErrors(errors);
      return errors;
    }

    if (!passwordPattern.test(password)) {
      errors.password = "Password must be 6+ characters long and contain both letters and numbers.";
      setErrors(errors);
      return errors;
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signUp(formData);
      navigate("/profile");
    } catch {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          value={formData.email}
          errorMessage={errors.email}
        />
        <CustomInput
          name="login"
          inputType="text"
          placeholderText="Your login..."
          handleChangeInput={handleChange}
          value={formData.login}
          errorMessage={errors.login}
        />
        <CustomInput
          name="password"
          inputType="password"
          placeholderText="Your password..."
          handleChangeInput={handleChange}
          value={formData.password}
          errorMessage={errors.password}
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
