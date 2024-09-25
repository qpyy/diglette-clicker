import DigletAnimation from "../DigletAnimation";
import { StyledAnotherUserWrapper } from "./styles";

const AnotherUser = ({ otherUser }) => {
  return (
    <StyledAnotherUserWrapper>
      <h2>Его зовут: {otherUser?.login}</h2>
      <h1>{otherUser?.coins}</h1>
      <DigletAnimation />
    </StyledAnotherUserWrapper>
  );
};

export default AnotherUser;
