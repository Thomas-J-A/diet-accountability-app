import { Flex, Text, Quote } from '@radix-ui/themes';
import { StarFilledIcon } from '@radix-ui/react-icons';

const Stars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <StarFilledIcon
        key={i}
        role="presentation"
        height="20"
        width="20"
        color="gold"
      />,
    );
  }

  return <Flex>{stars}</Flex>;
};

interface SlideProps {
  testimonial: {
    id: number;
    name: string;
    avatarUrl: string;
    alt: string;
    content: string;
    rating: number;
  };
}

const Slide = ({ testimonial }: SlideProps) => {
  return (
    <Flex direction="column" gap="2" align="center">
      {/* Avatar here */}

      <Stars rating={testimonial.rating} />

      <Text size={{ initial: '3', md: '4' }} align="center">
        <Quote>{testimonial.content}</Quote>
      </Text>

      <Text size={{ initial: '1', md: '2' }} align="center" weight="bold">
        - {testimonial.name}
      </Text>
    </Flex>
  );
};

export default Slide;
