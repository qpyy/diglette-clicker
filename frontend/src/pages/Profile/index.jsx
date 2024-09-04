import { useEffect } from "react";
import DigletAnimation from "../../components/DigletAnimation";
import { useStore } from "../../store/useStore";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCoins } from "../../hooks/useCoins";
import { Container } from "./styles";

const Profile = () => {
  const { addCoins } = useCoins();
  const { getCurrentUser, isLoading } = useCurrentUser();
  const { user } = useStore.getState();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const incrementCount = () => {
    addCoins(10);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div>
        <h1>{user.coins}</h1>
      </div>
      <DigletAnimation incrementCount={incrementCount} />
    </Container>
  );
};

export default Profile;
