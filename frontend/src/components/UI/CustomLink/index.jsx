import { StyledCustomLink } from "./styles";

const CustomLink = ({ pathTo, buttonText }) => {
  return <StyledCustomLink to={pathTo}>{buttonText}</StyledCustomLink>;
};

export default CustomLink;
