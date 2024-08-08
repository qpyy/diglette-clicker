import styled from "styled-components";

const Container = styled.div`
  width: 450px;
  height: 500px;

  @media (max-width: 540px) {
    width: 350px;
  }

  @media (max-width: 420px) {
    width: 300px;
  }

  @media (max-width: 370px) {
    width: 254px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);
  background: #90644e66;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.45em 1em;
  font-size: 20px;
  background-color: #90644e;
  color: #ffffff;
  border: 2px solid #483227;
  transition: background-color 0.25s;

  &:hover {
    background-color: #483227;
  }
`;

const DividerText = styled.h4`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #483227;
    margin: 0 0.4rem;
  }
`;

export { Container, Form, Title, Button, DividerText };
