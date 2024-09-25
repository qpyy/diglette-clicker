import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useLogIn } from "../../hooks/useLogin";
import { useStore } from "../../store/useStore";
import { errorMessages, patterns } from "../../constants/validationConstants";
import { Container, Form, Title, Button, DividerText } from "./styles";

const initialUserState = {
  login: "",
  password: "",
};

const initialErrorState = {
  username: "",
  password: "",
};

const SignInPage = () => {
  const [newUser, setUser] = useState(initialUserState);
  const [errorsMessage, setErrorsMessage] = useState(initialErrorState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { logIn, isLoading, error } = useLogIn();
  const { logout } = useStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const validate = () => {
    const { login, password } = newUser;
    const newErrors = { ...initialErrorState };

    if (!login.trim()) {
      newErrors.username = errorMessages.requiredLogin;
    } else if (!patterns.username.test(login)) {
      newErrors.username = errorMessages.invalidLogin;
    }

    if (!password.trim()) {
      newErrors.password = errorMessages.requiredPassword;
    } else if (!patterns.password.test(password)) {
      newErrors.password = errorMessages.invalidPassword;
    }

    setErrorsMessage(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await logIn(newUser);
      navigate(`/user/${newUser.login}`);
    } catch {
      setOpenSnackbar(true);
    }
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
        message={error?.message || "Failed to sign in"}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2000}
      />
    </Container>
  );
};

export default SignInPage;
