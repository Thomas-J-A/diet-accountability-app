import { Flex, Text, Separator } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';
import Navigation from './Navigation/Navigation';
import AccountOptions from './AccountOptions/AccountOptions';

const Menu = () => {
  return (
    <Flex direction="column" gap="2" p="3" grow="1">
      <Navigation />
      <Separator size="4" />
      <AccountOptions />
      <Flex align="center" gap="2" mt="auto">
        <PersonIcon />
        <Text>Signed in as Aurelius</Text>
      </Flex>
    </Flex>
  );
};

export default Menu;
