import { Grid, Box, Container } from '@radix-ui/themes';
import HeroText from './HeroText/HeroText';
import SignUpForm from './SignUpForm/SignUpForm';
import TestimonialsCarousel from './TestimonialsCarousel/TestimonialsCarousel';
import FeaturedCarousel from './FeaturedCarousel/FeaturedCarousel';
import * as S from './LandingPage.styled';

const LandingPage = () => {
  return (
    <Box p="6" asChild>
      <S.LandingPage>
        <Container size={{ initial: '1', md: '3' }}>
          <Grid
            gap="5"
            columns={{ md: '3fr 2fr' }}
            rows={{ md: '2fr 1fr' }}
            align="center"
          >
            <HeroText />
            <SignUpForm />
            <TestimonialsCarousel />
            <FeaturedCarousel />
          </Grid>
        </Container>
      </S.LandingPage>
    </Box>
  );
};

export default LandingPage;
