import { useState } from "react";
import DigletImage from "../../assets/images/diglet.svg";
import OverlayDigletImage from "../../assets/images/overlay-diglet.svg";
import { Container, Wrapper, Diglet, DigletOverlay } from "./styles";

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
