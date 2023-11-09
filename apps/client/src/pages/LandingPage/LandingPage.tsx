import { Grid, Box } from '@radix-ui/themes';
import HeroText from './HeroText/HeroText';
import SignUpForm from './SignUpForm/SignUpForm';
import TestimonialsCarousel from './TestimonialsCarousel/TestimonialsCarousel';
import FeaturedCarousel from './FeaturedCarousel/FeaturedCarousel';
import * as S from './LandingPage.styled';

const LandingPage = () => {
  return (
    <Box p="6" asChild>
      <S.LandingPage>
        <Grid gap="5">
          <HeroText />
          <SignUpForm />
          <TestimonialsCarousel />
          <FeaturedCarousel />
        </Grid>
      </S.LandingPage>
    </Box>
  );
};

export default LandingPage;
