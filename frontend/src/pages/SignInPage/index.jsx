import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import { useLogIn } from "../../hooks/useLogin";
import { Container, Form, Title, Button } from "./styles";
import CustomLink from "../../components/UI/CustomLink";
import { DividerText } from "./styles";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { logIn, isLoading, error } = useLogIn();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = ({ login, password }) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    const loginPattern = /^[0-9A-Za-z]{6,16}$/;
    const errors = {};
    setErrors({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await logIn(formData);
      navigate("/profile");
    } catch {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Log In</Title>
        <CustomInput
          name="login"
          inputType="text"
          placeholderText="Your login..."
          handleChangeInput={handleChange}
          value={formData.login}
          errorMessage={errors.login}
          autoCompleteValue="username"
        />
        <CustomInput
          name="password"
          inputType="password"
          placeholderText="Your password..."
          handleChangeInput={handleChange}
          value={formData.password}
          errorMessage={errors.password}
          autoCompleteValue="current-password"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </Button>

        <DividerText>Don&apos;t have an account yet?</DividerText>
        <CustomLink pathTo="/signup" linkText="SIGN UP" />
      </Form>

      <CustomSnackbar
        open={openSnackbar}
        message={error?.message || "Failed to sign up"}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2000}
      />
    </Container>
  );
};

export default SignInPage;
