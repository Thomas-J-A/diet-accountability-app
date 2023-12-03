import { Flex, Heading, Text, Em } from '@radix-ui/themes';
import bgImage from '/ad-bgs/pedros-herbs.jpg';

const PedrosHerbs = () => (
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
    <Heading size="4">Pedro&apos;s 🌿 Herbs</Heading>

    <Text size="2">
      It&apos;s <Em style={{ textDecoration: 'underline' }}>all</Em> medicinal
      😏
    </Text>
  </Flex>
);

export default PedrosHerbs;
