import { Flex, Heading, Text } from '@radix-ui/themes';

const SignUpHeader = () => {
  return (
    <Flex direction="column" gap={{ initial: '1', md: '2' }}>
      <Heading size={{ initial: '5', md: '7' }}>Register an account</Heading>
      <Text size={{ initial: '1', md: '2' }} weight="light">
        All fields marked with an asterisk (*) are required.
      </Text>
    </Flex>
  );
};

export default SignUpHeader;
