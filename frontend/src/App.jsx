import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
