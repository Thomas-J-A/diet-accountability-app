import { Flex, Heading, Text, Strong } from '@radix-ui/themes';
import bgImage from '/ad-bgs/wendells-iscream.jpg';

const WendellsIScream = () => (
  <Flex
    p={{ initial: '3', md: '4' }}
    direction="column"
    align="center"
    gap="1"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundColor: 'rgba(0,0,0,.6)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'darken',
      borderRadius: 'var(--radius-2)',
    }}
  >
    <Heading size="4" color="gold">
      Wendell&apos;s IScream
    </Heading>

    <Text size="2" color="orange">
      <Strong color="crimson">🎉 New</Strong> Jalapeño Flavour!
    </Text>
  </Flex>
);

export default WendellsIScream;
