import { Flex } from '@radix-ui/themes';
import { ExitIcon, TrashIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useToggleDrawer } from '../../../../contexts/ToggleDrawerContext';
import * as S from './AccountOptions.styled';

const AccountOptions = () => {
  const { logOut } = useAuthContext();
  const [, setIsOpen] = useToggleDrawer();

  const logOutAndCloseDrawer = () => {
    logOut();
    setIsOpen(false);
  };

  return (
    <Flex direction="column" gap="2">
      <S.OptionButton variant="soft" onClick={logOutAndCloseDrawer}>
        <ExitIcon /> Sign Out
      </S.OptionButton>
      <S.OptionButton variant="soft">
        <TrashIcon /> Delete Account
      </S.OptionButton>
    </Flex>
  );
};

export default AccountOptions;
