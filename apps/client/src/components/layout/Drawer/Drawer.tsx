import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import DrawerBody from './DrawerBody/DrawerBody';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerToggleButton from './DrawerToggleButton/DrawerToggleButton';
import { useContainerNode } from './../../../contexts/ContainerNodeContext';
import { useToggleDrawer } from '../../../contexts/ToggleDrawerContext';
import * as S from './Drawer.styled';

const Drawer = () => {
  const [isAuthed] = useState(true);
  const [containerNode] = useContainerNode();
  const [isOpen, setIsOpen] = useToggleDrawer();

  return (
    <S.Drawer display={{ initial: 'block', md: 'none' }}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <DrawerToggleButton isAuthed={isAuthed} />
        <Dialog.Portal container={containerNode}>
          <S.DrawerOverlay />
          <Dialog.Content aria-describedby={undefined} asChild>
            <S.DrawerContent direction="column">
              <DrawerHeader />
              <DrawerBody isAuthed={isAuthed} />
            </S.DrawerContent>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </S.Drawer>
  );
};

export default Drawer;
