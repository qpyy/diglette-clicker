import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 13rem;
    margin: 0;
    color: transparent;
    background: radial-gradient(circle at center, #967448 40%, #7f623c 60%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  @media (max-width: 570px) {
    h1 {
      font-size: 10rem;
    }
  }

  @media (max-width: 460px) {
    h1 {
      font-size: 8rem;
    }
  }

  @media (max-width: 340px) {
    h1 {
      font-size: 6rem;
    }
  }
`;

export { Container };
