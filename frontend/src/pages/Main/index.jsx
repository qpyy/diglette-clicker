import { useState } from "react";
import DigletAnimation from "../../components/DigletAnimation";
import { Container } from "./styles";

const Main = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <Container>
      <h1>{count}</h1>
      <DigletAnimation incrementCount={incrementCount} />
    </Container>
  );
};

export default Main;
