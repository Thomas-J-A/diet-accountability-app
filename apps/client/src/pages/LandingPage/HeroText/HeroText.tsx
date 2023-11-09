import { Flex, Heading, Text } from '@radix-ui/themes';

const HeroText = () => {
  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="1">
        <Heading size="7">Capture every meal.</Heading>
        <Heading as="h2" size="5">
          Take photos, stay on track.
        </Heading>
      </Flex>
      <Text size="1">
        Potentially one of the West Midlands&apos; top 100 diet accountability
        apps. Register today and power your progress!
      </Text>
    </Flex>
  );
};

export default HeroText;
