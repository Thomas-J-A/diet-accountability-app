import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@radix-ui/themes';
import Slide from './Slide/Slide';
import testimonials from '../../../data/testimonials';

const TestimonialsCarousel = () => {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
    <Box
      px={{ initial: '3', md: '6' }}
      width="100%"
      style={{ overflow: 'hidden' }}
    >
      <Slider {...settings}>
        {testimonials.map((t) => (
          <Slide key={t.id} testimonial={t} />
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialsCarousel;
