import DigletAnimation from "../DigletAnimation";
import { StyledUserWrapper } from "./styles";

const CurrentUser = ({ currentUser }) => {
  return (
    <StyledUserWrapper>
      <h1>{currentUser?.coins}</h1>
      <DigletAnimation incrementCount={true} />
    </StyledUserWrapper>
  );
};

export default CurrentUser;
