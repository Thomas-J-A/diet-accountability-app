import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as S from './DrawerHeader.styled';

const Header = () => {
  return (
    <S.DrawerHeader justify="end">
      <Dialog.Close asChild>
        <S.ExitButton size="1" variant="ghost">
          <Cross1Icon />
        </S.ExitButton>
      </Dialog.Close>
    </S.DrawerHeader>
  );
};

export default Header;
