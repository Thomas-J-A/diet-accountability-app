import { Flex, Text, Separator, Strong } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';
import Navigation from './Navigation/Navigation';
import AccountOptions from './AccountOptions/AccountOptions';
import { useAuthContext } from '../../../contexts/AuthContext';

const Menu = () => {
  const { currentUser } = useAuthContext();

  return (
    <Flex direction="column" gap="2" grow="1">
      <Navigation />
      <Separator size="4" />
      <AccountOptions />
      <Flex align="center" gap="2" mt="auto">
        <PersonIcon />
        <Text>
          Signed in as <Strong>{currentUser?.firstName}</Strong>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Menu;
