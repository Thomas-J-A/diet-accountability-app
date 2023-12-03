import { Flex, Heading, Text, Em } from '@radix-ui/themes';

const HeroText = () => {
  return (
    <Flex direction="column" gap={{ initial: '4', md: '6' }}>
      <Flex direction="column" gap={{ initial: '1', md: '4' }}>
        <Heading size={{ initial: '7', md: '9' }}>Capture every meal.</Heading>
        <Heading as="h2" size={{ initial: '5', md: '7' }}>
          Take photos, stay on track.
        </Heading>
      </Flex>
      <Text size={{ initial: '1', md: '4' }}>
        <Em>Potentially</Em> one of the West Midlands&apos; top 100 diet
        accountability apps. Register today and power your progress!
      </Text>
    </Flex>
  );
};

export default HeroText;
