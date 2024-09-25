import styled, { keyframes } from "styled-components";

const moveUpAndDownLarge = keyframes`
  0% {
    transform: translateY(30%) rotate(6deg);
  }
  50% {
    transform: translateY(10%) rotate(10deg);
  }
  100% {
    transform: translateY(30%) rotate(6deg);
  }
`;

const moveUpAndDownMedium = keyframes`
  0% {
    transform: translateY(20%) rotate(6deg);
  }
  50% {
    transform: translateY(5%) rotate(10deg);
  }
  100% {
    transform: translateY(20%) rotate(6deg);
  }
`;

const moveUpAndDownSmall = keyframes`
  0% {
    transform: translateY(15%) rotate(6deg);
  }
  50% {
    transform: translateY(0%) rotate(10deg);
  }
  100% {
    transform: translateY(15%) rotate(6deg);
  }
`;

const Container = styled.div`
  padding-bottom: 35%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 460px) {
    width: 70%;
  }

  @media (max-width: 350px) {
    width: 60%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 400px;
  height: 380px;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 460px) {
    width: 280px;
    height: 266px;
  }

  @media (max-width: 350px) {
    width: 240px;
    height: 228px;
  }
`;

const Diglet = styled.img`
  position: absolute;
  bottom: -125px;
  width: 100%;
  height: auto;
  cursor: pointer;
  transform: translateY(30%) rotate(6deg);
  animation: ${({ $animate }) => ($animate ? moveUpAndDownLarge : "none")} 0.3s forwards;

  @media (max-width: 460px) {
    transform: translateY(20%) rotate(6deg);
    animation: ${({ $animate }) => ($animate ? moveUpAndDownMedium : "none")} 0.3s forwards;
  }

  @media (max-width: 350px) {
    transform: translateY(15%) rotate(6deg);
    animation: ${({ $animate }) => ($animate ? moveUpAndDownSmall : "none")} 0.3s forwards;
  }
`;

const DigletOverlay = styled.img`
  position: relative;
  margin-top: -70px;
  z-index: 3;
  width: 400px;
  height: 150px;

  @media (max-width: 460px) {
    width: 280px;
    height: 105px;
    margin-top: -50px;
  }

  @media (max-width: 350px) {
    width: 240px;
    height: 90px;
    margin-top: -45px;
  }
`;

export { DigletOverlay, Container, Diglet, Wrapper };
