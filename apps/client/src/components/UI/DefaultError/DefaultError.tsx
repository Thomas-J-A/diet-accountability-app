import { Flex, Heading, Text } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import * as S from './DefaultError.styled';

const DefaultError = () => {
  return (
    <S.DefaultError
      direction="column"
      justify="center"
      align="center"
      gap="5"
      p="3"
    >
      <Flex direction="column" align="center" gap="2">
        <ExclamationTriangleIcon height="70" width="70" />
        <Heading size={{ initial: '6', md: '8' }}>
          Oops! Something went south...
        </Heading>
        <Text>Try refreshing the page or visit again later.</Text>
      </Flex>
    </S.DefaultError>
  );
};

export default DefaultError;
