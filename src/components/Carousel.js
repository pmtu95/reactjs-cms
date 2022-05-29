import Carousel, {
  Dots as CarouselDots,
  slidesToShowPlugin as CarouselSlidesToShowPlugin,
} from '@brainhubeu/react-carousel';
import styled from 'styled-components';

export default styled(Carousel)``;

export const Dots = styled(CarouselDots)`
  justify-content: flex-start;

  .BrainhubCarousel__thumbnail {
    padding: 10px 10px 0 0;
  }
`;

export const slidesToShowPlugin = CarouselSlidesToShowPlugin;
