import { StyledCustomInput, StyledError, StyledContainer } from "./styles";

const CustomInput = ({ errorMessage, name, handleChangeInput, placeholderValue, inputType }) => {
  return (
    <StyledContainer>
      <StyledCustomInput
        type={inputType}
        placeholder={placeholderValue}
        name={name}
        onChange={handleChangeInput}
      />
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
    </StyledContainer>
  );
};

export default CustomInput;
