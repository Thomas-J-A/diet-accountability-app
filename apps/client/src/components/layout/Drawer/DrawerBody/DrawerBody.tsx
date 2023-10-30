import * as Dialog from '@radix-ui/react-dialog';
import { Flex, Heading, Text, VisuallyHidden } from '@radix-ui/themes';
import Menu from '../../Menu/Menu';

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
        <Heading size="3">Sign in using your email and password</Heading>
      </Dialog.Title>
      <Text>Sign In fields here</Text>
    </Flex>
  );
};

export default DrawerBody;
