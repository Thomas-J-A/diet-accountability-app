/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import * as Label from '@radix-ui/react-label';
import { Flex, TextField, VisuallyHidden } from '@radix-ui/themes';
import { EnterIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldError from '../../UI/FieldError/FieldError';
import { toastError, toastSuccess } from '../../UI/Toast/toast';
import ToastMessages from '../../../constants/toast-messages';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useToggleDrawer } from '../../../contexts/ToggleDrawerContext';
import { SIGN_IN_MUTATION } from '../../../operations/mutations';
import * as S from './SignInForm.styled';

// Schema validation for sign in form
const formInputSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email must not be empty' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

// Generate form input type from Zod schema
type FormInputType = z.infer<typeof formInputSchema>;

const SignInForm = () => {
  const { logIn } = useAuthContext();
  const [, setIsOpen] = useToggleDrawer();

  // Helper function to close drawer when signing in on mobile via drawer component
  const closeDrawer = () => {
    setIsOpen(false);
  };

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputType>({
    defaultValues: {
      email: '',
      password: '',
    },
    delayError: 150,
    resolver: zodResolver(formInputSchema),
  });

  // Handle successful or failing form submission
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signIn }) => {
      logIn({
        currentUser: signIn.user,
        accessToken: signIn.tokens.accessToken,
      });

      // Display success message
      toastSuccess(ToastMessages.SIGNED_IN_SUCCESSFULLY);

      // On mobile, close drawer component
      closeDrawer();
    },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length) {
        for (const err of graphQLErrors) {
          if (err.extensions.code === 'INVALID_CREDENTIALS') {
            // Email/password validation failure in resolver should be displayed in UI
            setError('root', {
              type: 'server',
              message: 'Email or password is incorrect',
            });

            return;
          }

          // Unexpected error
          toastError(ToastMessages.INTERNAL_SERVER_ERROR);
        }
      }
    },
  });

  // Submit handler after passing form validation
  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    await signIn({
      variables: {
        credentials: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={{ initial: 'column', md: 'row' }} align="center" gap="2">
        <Flex direction="column" gap="2" width="100%" position="relative">
          <Label.Root>
            <VisuallyHidden>Email</VisuallyHidden>
            <TextField.Input
              {...register('email')}
              aria-invalid={errors.email ? true : false}
              size="2"
              variant="soft"
              type="email"
              placeholder="marco@gmail.com"
            />
          </Label.Root>
          {errors.email && (
            <S.AbsolutelyPositionedError>
              <FieldError text={errors.email.message!} />
            </S.AbsolutelyPositionedError>
          )}
        </Flex>

        <Flex direction="column" gap="2" width="100%" position="relative">
          <Label.Root>
            <VisuallyHidden>Password</VisuallyHidden>
            <TextField.Input
              {...register('password')}
              aria-invalid={errors.password ? true : false}
              size="2"
              variant="soft"
              type="password"
              placeholder="********"
            />
          </Label.Root>
          {errors.password && (
            <S.AbsolutelyPositionedError>
              <FieldError text={errors.password.message!} />
            </S.AbsolutelyPositionedError>
          )}
        </Flex>

        <Flex direction="column" gap="2" width="100%" position="relative">
          <S.SubmitButton type="submit" disabled={loading}>
            <EnterIcon /> Sign In
          </S.SubmitButton>

          {errors.root?.message && (
            <S.AbsolutelyPositionedError>
              <FieldError text={errors.root.message} />
            </S.AbsolutelyPositionedError>
          )}
        </Flex>
      </Flex>
    </form>
  );
};

export default SignInForm;
