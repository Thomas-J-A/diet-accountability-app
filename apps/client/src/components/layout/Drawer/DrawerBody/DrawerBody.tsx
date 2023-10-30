import * as Dialog from '@radix-ui/react-dialog';
import { Heading, Text, VisuallyHidden } from '@radix-ui/themes';
import Menu from '../../Menu/Menu';
import * as S from './DrawerBody.styled';

const DrawerBody = ({ isAuthed }: { isAuthed: boolean }) => {
  if (isAuthed) {
    return (
      <S.DrawerBody direction="column" gap="2" grow="1">
        <VisuallyHidden asChild>
          <Dialog.Title asChild>
            <Heading size="3">Menu</Heading>
          </Dialog.Title>
        </VisuallyHidden>
        <Menu />
      </S.DrawerBody>
    );
  }

  return (
    <S.DrawerBody direction="column" gap="2">
      <Dialog.Title asChild>
        <Heading size="3">Sign in using your email and password</Heading>
      </Dialog.Title>
      <Text>Sign In fields here</Text>
    </S.DrawerBody>
  );
};

export default DrawerBody;
