import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import DrawerBody from './DrawerBody/DrawerBody';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerToggleButton from './DrawerToggleButton/DrawerToggleButton';
import { useContainerNode } from './../../../contexts/ContainerNodeContext';
import * as S from './Drawer.styled';

const Drawer = () => {
  const [isAuthed] = useState(true);
  const [containerNode] = useContainerNode();

  return (
    <S.Drawer display={{ initial: 'block', md: 'none' }}>
      <Dialog.Root>
        <DrawerToggleButton isAuthed={isAuthed} />
        <Dialog.Portal container={containerNode}>
          <S.DrawerOverlay />
          <Dialog.Content aria-describedby={undefined} asChild>
            <S.DrawerContent direction="column" p="2">
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
