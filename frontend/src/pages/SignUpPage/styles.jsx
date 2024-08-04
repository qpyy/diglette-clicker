import styled from "styled-components";

const Container = styled.div`
  width: 450px;
  height: 500px;

  @media (max-width: 540px) {
    width: 350px;
  }

  @media (max-width: 420px) {
    width: 250px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);
  height: 100%;
  background: #90644e66;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.8em;
  margin-bottom: 1rem;
  background-color: #90644e;

  font-size: 1em;
  border: 1px solid #483227;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    color: #483227;
  }

  &:focus {
    border-color: #dddddd;
  }
`;

const Button = styled.button`
  padding: 0.4em 1em;
  font-size: 20px;
  background-color: #90644e;
  color: #ffffff;
  border: 2px solid #483227;
  transition: background-color 0.25s;

  &:hover {
    background-color: #483227;
  }
`;

export { Container, Form, Title, Input, Button };
