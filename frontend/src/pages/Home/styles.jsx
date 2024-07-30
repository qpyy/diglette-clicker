import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: "Rubik Moonrocks", sans-serif;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const DiglettImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const LinkButton = styled(Link)`
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 2rem;
  transition: color 0.25s;

  &:hover {
    color: #646cff;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
`;

export {
  Container,
  Header,
  MainContent,
  Title,
  Description,
  DiglettImage,
  LinkGroup,
  LinkButton,
  SocialIcons,
  SocialIcon,
  Footer,
};
