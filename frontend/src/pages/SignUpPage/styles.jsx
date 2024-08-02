import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: #333333;
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
  font-size: 1em;
  border: 1px solid #dddddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.25s;

  &:focus {
    border-color: #646cff;
  }
`;

const Button = styled.button`
  padding: 0.8em;
  font-size: 1em;
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #646cff;
  }
`;

export { Container, Form, Title, Input, Button };
