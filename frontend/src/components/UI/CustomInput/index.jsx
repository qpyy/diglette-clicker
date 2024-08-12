import { StyledCustomInput, StyledError, StyledContainer } from "./styles";

const CustomInput = ({
  errorMessage,
  name,
  handleChangeInput,
  placeholderText,
  inputType,
  autoCompleteValue,
}) => {
  return (
    <StyledContainer>
      <StyledCustomInput
        type={inputType}
        placeholder={placeholderText}
        name={name}
        onChange={handleChangeInput}
        autoComplete={autoCompleteValue}
      />
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
    </StyledContainer>
  );
};

export default CustomInput;
