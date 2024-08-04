import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Main from "./pages/Main";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<Main />} />
    </Routes>
  );
}

export default App;
