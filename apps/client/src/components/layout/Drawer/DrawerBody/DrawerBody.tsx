import * as Dialog from '@radix-ui/react-dialog';
import { Flex, Heading, VisuallyHidden, Separator } from '@radix-ui/themes';
import Menu from '../../Menu/Menu';
import SignInForm from '../../SignInForm/SignInForm';

const DrawerBody = ({ isAuthed }: { isAuthed: boolean }) => {
  if (isAuthed) {
    return (
      <Flex direction="column" gap="2" grow="1">
        <VisuallyHidden asChild>
          <Dialog.Title asChild>
            <Heading size="3">Menu</Heading>
          </Dialog.Title>
        </VisuallyHidden>
        <Menu />
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2">
      <Dialog.Title asChild>
        <Heading size="3">Sign in and get the party started!</Heading>
      </Dialog.Title>
      <Separator size="4" />
      <SignInForm />
    </Flex>
  );
};

export default DrawerBody;
