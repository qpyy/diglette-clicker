import { useState } from "react";
import { Container, Wrapper, Diglet, DigletOverlay } from "./styles";
import DigletImage from "../../assets/images/diglet.svg";
import OverlayDigletImage from "../../assets/images/overlay-diglet.svg";

const DigletAnimation = ({ incrementCount }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    incrementCount();
    setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  return (
    <Container>
      <Wrapper onClick={handleClick}>
        <Diglet src={DigletImage} animate={animate} />
      </Wrapper>
      <DigletOverlay src={OverlayDigletImage} />
    </Container>
  );
};

export default DigletAnimation;
