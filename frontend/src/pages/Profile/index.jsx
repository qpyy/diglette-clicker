import { useParams } from "react-router-dom";
import CurrentUser from "../../components/CurrentUser";
import AnotherUser from "../../components/AnotherUser";
import Loader from "../../components/UI/Loader";
import { useGetUserByLogin } from "../../hooks/useGetUserByLogin";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useStore } from "../../store/useStore";
import { StyledProfileWrapper } from "./styles";

const Profile = () => {
  const { login } = useParams();
  const { user, isLoading: isCurrentUserLoading } = useCurrentUser();
  const { otherUser, isLoading: isOtherUserLoading } = useGetUserByLogin(login);
  const { user: currentUser } = useStore.getState();

  if (isCurrentUserLoading || isOtherUserLoading || !user || !otherUser) {
    return <Loader />;
  }

  const isCurrentUser = user?.id === otherUser?.id;

  return (
    <StyledProfileWrapper>
      {isCurrentUser ? (
        <CurrentUser currentUser={currentUser} />
      ) : (
        <AnotherUser otherUser={otherUser} />
      )}
    </StyledProfileWrapper>
  );
};

export default Profile;
