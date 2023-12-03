import { Flex, Heading, Text, Em } from '@radix-ui/themes';
import bgImage from '/ad-bgs/mcdougalls-matchmaking.jpg';

const McDougallsMatchMaking = () => (
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
    <Heading size="4" color="orange">
      McDougall&apos;s MatchMaking
    </Heading>

    <Text size="2">
      Your first flame, <Em>and your last.</Em>
    </Text>

    {/* <Text size="1">
      Please note this is a service offering quality, handcrafted matchsticks
      and not a dating agency.
    </Text> */}
  </Flex>
);

export default McDougallsMatchMaking;
