import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useLogIn } from "../../hooks/useLogin";
import { Container, Form, Title, Button, DividerText } from "./styles";

const SignInPage = () => {
  const [newUser, setUser] = useState({
    login: "",
    password: "",
  });
  const [errorsMessage, setErrorsMessage] = useState({ username: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { logIn, isLoading, error } = useLogIn();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateForm = async (e) => {
    e.preventDefault();
    setErrorsMessage({ username: "", password: "" });
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    const usernamePattern = /^[0-9A-Za-z]{6,16}$/;
    const { login, password } = newUser;

    if (!login.trim()) {
      setErrorsMessage({ username: "Login is required." });
      return;
    }

    if (!usernamePattern.test(login)) {
      setErrorsMessage({
        username: "Login must be 6-16 characters long and contain only letters and numbers.",
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
      await logIn(newUser);
      navigate("/user/" + login);
    } catch {
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <Form onSubmit={validateForm}>
        <Title>Log In</Title>
        <CustomInput
          name="login"
          inputType="text"
          placeholderText="Your login..."
          handleChangeInput={handleChange}
          errorMessage={errorsMessage.username}
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
