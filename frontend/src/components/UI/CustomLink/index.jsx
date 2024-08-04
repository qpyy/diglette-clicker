import { StyledCustomLink, ExternalCustomLink } from "./styles";

const CustomLink = ({ pathTo, linkText, external = false }) => {
  return external ? (
    <ExternalCustomLink href={pathTo} target="_blank" rel="noopener noreferrer">
      {linkText}
    </ExternalCustomLink>
  ) : (
    <StyledCustomLink to={pathTo}>{linkText}</StyledCustomLink>
  );
};

export default CustomLink;
