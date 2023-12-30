import { useApolloClient, useMutation } from '@apollo/client';
import { Flex, Button, AlertDialog } from '@radix-ui/themes';
import { ExitIcon, TrashIcon } from '@radix-ui/react-icons';
import { toastError, toastSuccess } from '../../../UI/Toast/toast';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useToggleDrawer } from '../../../../contexts/ToggleDrawerContext';
import { DELETE_USER_MUTATION } from '../../../../operations/mutations';
import * as S from './AccountOptions.styled';

// A button which triggers a confirmation alert dialog
const DeleteAccountButton = ({
  onConfirm,
}: {
  onConfirm: () => Promise<void>;
}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <S.OptionButton variant="soft">
        <TrashIcon /> Delete Account
      </S.OptionButton>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description size="2">
        This will permanently delete your user profile and all associated data.
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" onClick={onConfirm}>
            Confirm
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  </AlertDialog.Root>
);

// Renders log out and delete account buttons
const AccountOptions = () => {
  const client = useApolloClient();
  const { logOut, currentUser } = useAuthContext();
  const [, setIsOpen] = useToggleDrawer();

  // Mutate function to delete all user data in backend
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  // Click handler for log out button
  const logOutAndCloseDrawer = () => {
    logOut();
    void client.resetStore();
    toastSuccess('Signed out successfully 👋');
    setIsOpen(false);
  };

  // Click handler for delete account button
  const deleteAccountAndCloseDrawer = async () => {
    try {
      // Call mutate function to delete data on backend
      // Type assertion is okay because this component only renders
      // when a currentUser value exists (user has logged in)
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      await deleteUser({ variables: { id: currentUser?.id as string } });

      // Log user out of protected UI and reset Apollo cache
      logOut();
      void client.resetStore();

      // Inform user of success
      toastSuccess('Deleted account data successfully 🗑️');

      // Close side drawer
      setIsOpen(false);
    } catch (err) {
      toastError('Error deleting account 🤷‍♂️');
    }
  };

  return (
    <Flex direction="column" gap="2">
      <S.OptionButton variant="soft" onClick={logOutAndCloseDrawer}>
        <ExitIcon /> Sign Out
      </S.OptionButton>
      <DeleteAccountButton onConfirm={deleteAccountAndCloseDrawer} />
    </Flex>
  );
};

export default AccountOptions;
