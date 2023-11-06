import { Flex, Heading, Text } from '@radix-ui/themes';

const SignUpHeader = () => {
  return (
    <Flex direction="column" gap="1">
      <Heading size="5">Register an account</Heading>
      <Text size="1" weight="light">
        All fields marked with an asterisk (*) are required.
      </Text>
    </Flex>
  );
};

export default SignUpHeader;
