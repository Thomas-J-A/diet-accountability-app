import { Flex, Text } from '@radix-ui/themes';
import * as S from './Footer.styled';

const Footer = () => {
  return (
    <Flex justify="center" p={{ initial: '2', md: '3' }} asChild>
      <S.Footer>
        <Text size={{ initial: '1', md: '2' }}>
          Copyright 1905 | All Rights Expired
        </Text>
      </S.Footer>
    </Flex>
  );
};

export default Footer;
