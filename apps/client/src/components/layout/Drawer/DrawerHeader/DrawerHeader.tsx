import * as Dialog from '@radix-ui/react-dialog';
import { IconButton } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as S from './DrawerHeader.styled';

const Header = () => {
  return (
    <S.DrawerHeader mb="2">
      <Dialog.Close className="CLOSE" asChild>
        <IconButton size="1" variant="ghost">
          <Cross1Icon />
        </IconButton>
      </Dialog.Close>
    </S.DrawerHeader>
  );
};

export default Header;
