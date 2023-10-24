import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconButton, Button } from '@radix-ui/themes';
import { HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';

const DrawerTrigger = () => {
  const [isAuthed] = useState(false);

  if (isAuthed) {
    return (
      <Dialog.Trigger className="DIALOG TRIGGER" asChild>
        <IconButton size="1" variant="ghost">
          <HamburgerMenuIcon height="30" width="30" />
        </IconButton>
      </Dialog.Trigger>
    );
  }

  return (
    <Dialog.Trigger className="DIALOG TRIGGER" asChild>
      <Button>
        <PersonIcon /> Sign In
      </Button>
    </Dialog.Trigger>
  );
};

export default DrawerTrigger;
