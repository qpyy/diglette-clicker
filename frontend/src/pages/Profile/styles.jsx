import styled from "styled-components";

const Container = styled.div`
  h1 {
    font-size: 13rem;
    margin: 0;
    color: transparent;
    background: radial-gradient(circle at center, #967448 40%, #7f623c 60%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  @media (max-width: 460px) {
    h1 {
      font-size: 8rem;
    }
  }
`;

export { Container };
