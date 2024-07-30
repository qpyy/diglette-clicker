import {
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
} from "./styles";
import diglettImage from "../../assets/images/diglett-welcome.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <Container>
      <Header>
        <Title>Welcome to Diglett Clicker Game!</Title>
      </Header>
      <MainContent>
        <Description>
          Join the fun and start clicking on Digletts to earn points! Sign up or sign in to track
          your progress and compete with friends.
        </Description>
        <DiglettImage src={diglettImage} alt="Diglett" />
        <LinkGroup>
          <LinkButton to="/profile">Sign Up</LinkButton>
          <LinkButton to="/profile">Sign In</LinkButton>
        </LinkGroup>
        <SocialIcons>
          <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram />
          </SocialIcon>
        </SocialIcons>
      </MainContent>
      <Footer>&copy; 2024 Diglett Clicker Game. All rights reserved.</Footer>
    </Container>
  );
};

export default Home;
