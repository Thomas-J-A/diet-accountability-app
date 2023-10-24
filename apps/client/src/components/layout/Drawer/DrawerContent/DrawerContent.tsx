import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heading, Text, VisuallyHidden } from '@radix-ui/themes';
import * as S from './DrawerContent.styled';

const DrawerContent = () => {
  const [isAuthed] = useState(false);

  if (isAuthed) {
    return (
      <S.DrawerContent direction="column" gap="2">
        <VisuallyHidden asChild>
          <Dialog.Title asChild>
            <Heading size="3">Navigation Menu</Heading>
          </Dialog.Title>
        </VisuallyHidden>
        <Text>Links</Text>
      </S.DrawerContent>
    );
  }

  return (
    <S.DrawerContent direction="column" gap="2">
      <Dialog.Title className="TITLE" asChild>
        <Heading size="3">Sign in using your email and password</Heading>
      </Dialog.Title>
      <Text>Sign In fields here</Text>
    </S.DrawerContent>
  );
};

export default DrawerContent;
