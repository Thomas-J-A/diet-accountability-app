import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide from './Slide/Slide';
import testimonials from '../../../data/testimonials';
import * as S from './Testimonials.styled';

const TestimonialsCarousel = () => {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    // fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <S.StyledBox px={{ initial: '3', md: '6' }}>
      <Slider {...settings}>
        {testimonials.map((t) => (
          <Slide key={t.id} testimonial={t} />
        ))}
      </Slider>
    </S.StyledBox>
  );
};

export default TestimonialsCarousel;
