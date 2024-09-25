import DigletAnimation from "../DigletAnimation";
import { StyledCurrentUserWrapper } from "./styles";

const CurrentUser = ({ currentUser }) => {
  return (
    <StyledCurrentUserWrapper>
      <h1>{currentUser?.coins}</h1>
      <DigletAnimation incrementCount={true} />
    </StyledCurrentUserWrapper>
  );
};

export default CurrentUser;
