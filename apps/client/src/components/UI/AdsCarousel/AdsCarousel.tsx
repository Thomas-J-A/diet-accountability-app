import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@radix-ui/themes';
import PedrosHerbs from '../Ads/PedrosHerbs';
import McDougallsMatchMaking from '../Ads/McDougallsMatchMaking';
import WendellsIScream from '../Ads/WendellsIScream';

const AdsCarousel = () => {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Box
      width="100%"
      style={{
        overflow: 'hidden',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <Slider {...settings}>
        <PedrosHerbs />
        <McDougallsMatchMaking />
        <WendellsIScream />
      </Slider>
    </Box>
  );
};

export default AdsCarousel;
