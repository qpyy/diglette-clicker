import CustomLink from "../../components/UI/CustomLink";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import diglettImage from "../../assets/images/diglett-welcome.png";
import {
  Container,
  Header,
  MainContent,
  Title,
  Description,
  DiglettImage,
  LinkGroup,
  SocialIcons,
  Footer,
} from "./styles";

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
          <CustomLink pathTo="/signup" linkText="Sign Up" />
          <CustomLink pathTo="/signin" linkText="Sign In" />
        </LinkGroup>
        <SocialIcons>
          <CustomLink pathTo="https://facebook.com" linkText={<FaFacebook />} external />
          <CustomLink pathTo="https://twitter.com" linkText={<FaXTwitter />} external />
          <CustomLink pathTo="https://instagram.com" linkText={<FaInstagram />} external />
        </SocialIcons>
      </MainContent>
      <Footer>&copy; 2024 Diglett Clicker Game. All rights reserved.</Footer>
    </Container>
  );
};

export default Home;
