import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-100px);
  }
  40% {
    transform: translateY(0);
  }
  55% {
    transform: translateY(-50px); 
  }
  70% {
    transform: translateY(0); 
  }
  85% {
    transform: translateY(-25px); 
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledLoader = styled.div`
  animation: ${bounce} 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: solid ${({ size }) => size / 25}px black;
  position: relative;
  background: linear-gradient(to bottom, #eeeeee 0%, #ffffff 100%);
  margin: 10px auto;

  &::before,
  &::after {
    content: "";
    display: block;
  }

  &,
  &::before,
  &::after {
    transition: all 600ms cubic-bezier(0.67, 0.4, 0.36, 0.75);
  }

  &::before {
    width: 100%;
    height: 50%;
    border-bottom: solid ${({ size }) => size / 25}px black;
    border-radius: ${({ size }) => size / 2}px ${({ size }) => size / 2}px 0 0;
    background: linear-gradient(to bottom, #d10000 0%, #ff0000 50%);
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    width: ${({ size }) => size / 5}px;
    height: ${({ size }) => size / 5}px;
    background: linear-gradient(to bottom, #fff 0%, #ccc 100%);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0 0 ${({ size }) => size / 50}px black, 0 0 0 ${({ size }) => size / 25}px #ddd,
      0 0 0 ${({ size }) => size / 14}px black,
      0 0 ${({ size }) => size / 10}px ${({ size }) => size / 17}px rgba(0, 0, 0, 0.4);
  }
`;

export { StyledLoader };
