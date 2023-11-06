import * as Dialog from '@radix-ui/react-dialog';
import DrawerBody from './DrawerBody/DrawerBody';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerToggleButton from './DrawerToggleButton/DrawerToggleButton';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useContainerNode } from './../../../contexts/ContainerNodeContext';
import { useToggleDrawer } from '../../../contexts/ToggleDrawerContext';
import * as S from './Drawer.styled';

const Drawer = () => {
  const { isAuthenticated } = useAuthContext();
  const [containerNode] = useContainerNode();
  const [isOpen, setIsOpen] = useToggleDrawer();

  return (
    <S.Drawer display={{ initial: 'block', md: 'none' }}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <DrawerToggleButton isAuthed={isAuthenticated} />
        <Dialog.Portal container={containerNode}>
          <S.DrawerOverlay />
          <Dialog.Content aria-describedby={undefined} asChild>
            <S.DrawerContent direction="column" gap="3" p="3">
              <DrawerHeader />
              <DrawerBody isAuthed={isAuthenticated} />
            </S.DrawerContent>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </S.Drawer>
  );
};

export default Drawer;
