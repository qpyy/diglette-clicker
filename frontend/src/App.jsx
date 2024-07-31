import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Main />} />
    </Routes>
  );
}

export default App;
