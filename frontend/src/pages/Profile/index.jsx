import { useParams } from "react-router-dom";
import DigletAnimation from "../../components/DigletAnimation";
import Loader from "../../components/UI/Loader";
import { useGetUserByLogin } from "../../hooks/useGetUserByLogin";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCoins } from "../../hooks/useCoins";
import { useStore } from "../../store/useStore";
import { Container } from "./styles";

const Profile = () => {
  const { login } = useParams();
  const { user, isLoading: isCurrentUserLoading } = useCurrentUser();
  const { otherUser, isLoading: isOtherUserLoading } = useGetUserByLogin(login);
  const { user: currentUser } = useStore.getState();
  const { addCoins } = useCoins();

  if (isCurrentUserLoading || isOtherUserLoading || !user || !otherUser) {
    return <Loader />;
  }

  const incrementCount = () => {
    addCoins(10);
  };

  const isCurrentUser = user?.id === otherUser?.id;

  return (
    <Container>
      {isCurrentUser ? (
        <>
          <h1>{currentUser?.coins}</h1>
          <DigletAnimation incrementCount={incrementCount} />
        </>
      ) : (
        <>
          <h2>Его зовут: {otherUser?.login}</h2>
          <h1>{otherUser?.coins}</h1>
          <DigletAnimation />
        </>
      )}
    </Container>
  );
};

export default Profile;
