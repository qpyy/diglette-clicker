import DigletAnimation from "../../components/DigletAnimation";
import { Container } from "./styles";
import { useCoins } from "../../hooks/useCoins";

const Profile = () => {
  const { coins, addCoins } = useCoins();

  const incrementCount = () => {
    addCoins(10);
  };

  return (
    <Container>
      <h1>{coins}</h1>
      <DigletAnimation incrementCount={incrementCount} />
    </Container>
  );
};

export default Profile;
