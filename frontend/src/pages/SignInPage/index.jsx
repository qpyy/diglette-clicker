import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import CustomInput from "../../components/UI/CustomInput";
import CustomLink from "../../components/UI/CustomLink";
import { useLogIn } from "../../hooks/useLogin";
import { useStore } from "../../store/useStore";
import useValidation from "../../hooks/useValidation";
import { validateSignIn } from "../../utils/validationRules";
import { Container, Form, Title, Button, DividerText } from "./styles";

const initialUserState = {
  login: "",
  password: "",
};

const SignInPage = () => {
  const [newUser, setUser] = useState(initialUserState);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { errors, validate } = useValidation(validateSignIn);
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

  const handleCloseSnackbar = () => setIsSnackbarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(newUser)) return;

    try {
      await logIn(newUser);
      navigate(`/user/${newUser.login}`);
    } catch {
      setIsSnackbarOpen(true);
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </Button>

        <DividerText>Don&apos;t have an account yet?</DividerText>
        <CustomLink pathTo="/signup" linkText="SIGN UP" />
      </Form>

      <CustomSnackbar
        open={isSnackbarOpen}
        message={error?.message || "Failed to sign in"}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2000}
      />
    </Container>
  );
};

export default SignInPage;
