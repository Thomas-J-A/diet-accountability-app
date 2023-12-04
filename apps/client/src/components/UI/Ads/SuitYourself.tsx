import { Flex, Heading, Text } from '@radix-ui/themes';
import bgImage from '/ad-bgs/suit-yourself.jpg';

const SuitYourself = () => (
  <Flex
    p={{ initial: '3', md: '4' }}
    direction="column"
    align="center"
    gap="1"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundColor: 'rgba(0,0,0,.7)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'darken',
      borderRadius: 'var(--radius-2)',
    }}
  >
    <Flex direction="column" gap="1" align="center">
      <Heading size="7" color="gold">
        Suit Yourself
      </Heading>

      <Text size="2" color="gold">
        Don&apos;t be tie-d down by a bad look.
      </Text>
    </Flex>

    <Text size="2" weight="light" mt="4">
      🎉 Now available for pooches 🐶
    </Text>
  </Flex>
);

export default SuitYourself;
