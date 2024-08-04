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

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
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
  SocialIcons,
  Footer,
};
