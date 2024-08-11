import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCustomLink = styled(Link)`
  background-color: #90644e;
  color: #ffffff;
  border: 2px solid #483227;
  border-radius: 8px;
  padding: 0.3em 1em;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #483227;
  }

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const ExternalCustomLink = styled.a`
  color: #ffffff;
  font-size: 2rem;
  transition: color 0.3s;

  &:hover {
    color: #646cff;
  }
`;

export { StyledCustomLink, ExternalCustomLink };
