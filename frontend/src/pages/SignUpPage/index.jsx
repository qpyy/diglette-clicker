import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import { useSignUp } from "../../hooks/useSignUp";
import { Container, Form, Title, Input, Button } from "./styles";

const SignUpPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signUp, isLoading, error } = useSignUp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "СREATE ACCOUNT"}
        </Button>
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

export default SignUpPage;
