import { useState } from "react";
import { useCoins } from "../../hooks/useCoins";
import DigletImage from "../../assets/images/diglette.svg";
import OverlayDigletImage from "../../assets/images/overlay-diglet.svg";
import { Container, Wrapper, Diglet, DigletOverlay } from "./styles";

const DigletAnimation = ({ incrementCount }) => {
  const [animate, setAnimate] = useState(false);
  const { addCoins } = useCoins();

  const handleClick = () => {
    setAnimate(true);

    if (incrementCount) {
      addCoins(10);
    }

    setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  return (
    <Container>
      <Wrapper onClick={handleClick}>
        <Diglet src={DigletImage} $animate={animate} />
      </Wrapper>
      <DigletOverlay src={OverlayDigletImage} />
    </Container>
  );
};

export default DigletAnimation;
