import styled from "styled-components";

const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(3rem, 12vw, 13rem);
    margin: 0;
    color: transparent;
    background: radial-gradient(circle at center, #967448 40%, #7f623c 60%);
    -webkit-background-clip: text;
    background-clip: text;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow-wrap: break-word;
  }
`;

export { StyledProfileWrapper };
