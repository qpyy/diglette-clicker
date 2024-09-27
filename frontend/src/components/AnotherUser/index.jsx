import DigletAnimation from "../DigletAnimation";
import { StyledUserWrapper } from "../CurrentUser/styles";

const AnotherUser = ({ otherUser }) => {
  return (
    <StyledUserWrapper>
      <h2>Его зовут: {otherUser?.login}</h2>
      <h1>{otherUser?.coins}</h1>
      <DigletAnimation />
    </StyledUserWrapper>
  );
};

export default AnotherUser;
