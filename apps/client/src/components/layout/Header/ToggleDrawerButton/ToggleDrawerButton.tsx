import * as Dialog from '@radix-ui/react-dialog';
import DrawerTrigger from '../../Drawer/DrawerTrigger/DrawerTrigger';
import DrawerOverlay from '../../Drawer/DrawerOverlay/DrawerOverlay';
import Drawer from '../../Drawer/Drawer';
import * as S from './ToggleDrawerButton.styled';

const container = document.getElementById('container');

const ToggleDrawerButton = () => {
  return (
    <S.ToggleDrawerButton display={{ initial: 'block', md: 'none' }}>
      <Dialog.Root>
        <DrawerTrigger />
        <Dialog.Portal container={container}>
          <DrawerOverlay />
          <Drawer />
        </Dialog.Portal>
      </Dialog.Root>
    </S.ToggleDrawerButton>
  );
};

export default ToggleDrawerButton;
