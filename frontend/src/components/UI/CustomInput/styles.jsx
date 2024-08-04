import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  position: relative;
`;

const StyledCustomInput = styled.input`
  width: 100%;
  padding: 0.8em;
  margin-bottom: 2rem;
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

const StyledError = styled.span`
  display: block;
  position: absolute;
  bottom: 4px;
  right: 0;
  padding-right: 5px;
  text-align: right;
  max-width: 100%;
  line-height: 0.99em;
  color: red;
  font-size: 0.875em;
`;

export { StyledError, StyledCustomInput, StyledContainer };
