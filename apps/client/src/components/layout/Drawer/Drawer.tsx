import * as Dialog from '@radix-ui/react-dialog';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerContent from './DrawerContent/DrawerContent';
import * as S from './Drawer.styled';

const Drawer = () => {
  return (
    <Dialog.Content aria-describedby={undefined} asChild>
      <S.Drawer direction="column" p="2">
        <DrawerHeader />
        <DrawerContent />
      </S.Drawer>
    </Dialog.Content>
  );
};

export default Drawer;
