import { Flex } from '@radix-ui/themes';
import { ExitIcon, TrashIcon } from '@radix-ui/react-icons';
import * as S from './AccountOptions.styled';

const AccountOptions = () => {
  return (
    <Flex direction="column" gap="2">
      <S.OptionButton variant="soft">
        <ExitIcon /> Sign Out
      </S.OptionButton>
      <S.OptionButton variant="soft">
        <TrashIcon /> Delete Account
      </S.OptionButton>
    </Flex>
  );
};

export default AccountOptions;
