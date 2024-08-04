import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import { useSignUp } from "../../hooks/useSignUp";
import { Container, Form, Title, Button } from "./styles";
import CustomInput from "../../components/UI/CustomInput";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
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

  const validateForm = ({ email, password }) => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    setErrors({});

    if (!email) {
      errors.email = "Email is required.";
      setErrors(errors);
      return errors;
    }

    if (!emailPattern.test(email)) {
      errors.email = "Invalid email address.";
      setErrors(errors);
      return errors;
    }

    if (!password) {
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
        <CustomInput
          name="email"
          inputType="email"
          placeholderValue="Email"
          handleChangeInput={handleChange}
          value={formData.email}
          errorMessage={errors.email}
        />
        <CustomInput
          name="password"
          inputType="password"
          placeholderValue="Password"
          handleChangeInput={handleChange}
          value={formData.password}
          errorMessage={errors.password}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "CREATE ACCOUNT"}
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
