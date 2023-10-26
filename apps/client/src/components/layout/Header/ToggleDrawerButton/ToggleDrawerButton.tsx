import * as Dialog from '@radix-ui/react-dialog';
import DrawerTrigger from '../../Drawer/DrawerTrigger/DrawerTrigger';
import DrawerOverlay from '../../Drawer/DrawerOverlay/DrawerOverlay';
import Drawer from '../../Drawer/Drawer';
import * as S from './ToggleDrawerButton.styled';
import { useContainerNode } from '../../../../contexts/ContainerNodeContext';

const ToggleDrawerButton = () => {
  const [containerNode] = useContainerNode();

  return (
    <S.ToggleDrawerButton display={{ initial: 'block', md: 'none' }}>
      <Dialog.Root>
        <DrawerTrigger />
        <Dialog.Portal container={containerNode}>
          <DrawerOverlay />
          <Drawer />
        </Dialog.Portal>
      </Dialog.Root>
    </S.ToggleDrawerButton>
  );
};

export default ToggleDrawerButton;
