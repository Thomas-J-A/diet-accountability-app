/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import * as Label from '@radix-ui/react-label';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpHeader from './SignUpHeader/SignUpHeader';
import FieldError from '../../../components/UI/FieldError/FieldError';
import { toastError, toastSuccess } from '../../../components/UI/Toast/toast';
import { useAuthContext } from '../../../contexts/AuthContext';
import { SIGN_UP_MUTATION } from '../../../operations/mutations';
import * as S from './SignUpForm.styled';

// Schema validation for sign up form
const formInputSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: 'First name must not be empty' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'Last name must not be empty' }),
    email: z
      .string()
      .min(1, { message: 'Email must not be empty' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: 'Password confirmation must not be empty' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

// Generate form input type from zod schema
type FormInputType = z.infer<typeof formInputSchema>;

const SignUpForm = () => {
  const { logIn } = useAuthContext();

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    delayError: 150,
    resolver: zodResolver(formInputSchema),
  });

  // Set up GraphQL mutation with success and error callbacks
  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: ({ signUp }) => {
      logIn({
        currentUser: signUp.user,
        accessToken: signUp.tokens.accessToken,
      });

      // Display success message
      toastSuccess('Signed up successfully 🎉');
    },
    onError: ({ graphQLErrors }) => {
      // Parsing, validation, resolver errors (network errors handled in Apollo Link)
      if (graphQLErrors.length) {
        for (const err of graphQLErrors) {
          if (err.extensions.code === 'EMAIL_TAKEN') {
            // Email validation failure in resolver should be displayed in UI
            setError('email', {
              type: 'manual',
              message: 'Email already exists',
            });

            return;
          }

          // Unexpected error
          toastError('Something went south 💥');
        }
      }
    },
  });

  // Submit user info to server
  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    await signUp({
      variables: {
        userData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  return (
    <S.SignUpForm direction="column" p={{ initial: '3', md: '5' }} gap="2">
      <SignUpHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={{ initial: '2', md: '4' }}>
          <Flex gap="3">
            <Flex direction="column" gap="2">
              <Label.Root>
                <Text size={{ initial: '1', md: '2' }} weight="bold">
                  First Name*
                </Text>
                <TextField.Input
                  {...register('firstName')}
                  aria-invalid={errors.firstName ? true : false}
                  size={{ initial: '1', md: '2' }}
                  variant="soft"
                  placeholder="Marcus"
                  mt={{ initial: '1', md: '2' }}
                />
              </Label.Root>
              {errors.firstName && (
                <FieldError text={errors.firstName.message!} />
              )}
            </Flex>

            <Flex direction="column" gap="2">
              <Label.Root>
                <Text size={{ initial: '1', md: '2' }} weight="bold">
                  Last Name*
                </Text>
                <TextField.Input
                  {...register('lastName')}
                  aria-invalid={errors.lastName ? true : false}
                  size={{ initial: '1', md: '2' }}
                  variant="soft"
                  placeholder="Aurelius"
                  mt={{ initial: '1', md: '2' }}
                />
              </Label.Root>
              {errors.lastName && (
                <FieldError text={errors.lastName.message!} />
              )}
            </Flex>
          </Flex>

          <Flex direction="column" gap="2">
            <Label.Root>
              <Text size={{ initial: '1', md: '2' }} weight="bold">
                Email*
              </Text>
              <TextField.Input
                {...register('email')}
                aria-invalid={errors.email ? true : false}
                size={{ initial: '1', md: '2' }}
                variant="soft"
                type="email"
                placeholder="marco@gmail.com"
                mt={{ initial: '1', md: '2' }}
              />
            </Label.Root>
            {errors.email && <FieldError text={errors.email.message!} />}
          </Flex>

          <Flex direction="column" gap="2">
            <Label.Root>
              <Text size={{ initial: '1', md: '2' }} weight="bold">
                Password*
              </Text>
              <TextField.Input
                {...register('password')}
                aria-invalid={errors.password ? true : false}
                size={{ initial: '1', md: '2' }}
                variant="soft"
                type="password"
                placeholder="********"
                mt={{ initial: '1', md: '2' }}
              />
            </Label.Root>
            {errors.password && <FieldError text={errors.password.message!} />}
          </Flex>

          <Flex direction="column" gap="2">
            <Label.Root>
              <Text size={{ initial: '1', md: '2' }} weight="bold">
                Confirm Password*
              </Text>
              <TextField.Input
                {...register('confirmPassword')}
                aria-invalid={errors.confirmPassword ? true : false}
                size={{ initial: '1', md: '2' }}
                variant="soft"
                type="password"
                placeholder="********"
                mt={{ initial: '1', md: '2' }}
              />
            </Label.Root>
            {errors.confirmPassword && (
              <FieldError text={errors.confirmPassword.message!} />
            )}
          </Flex>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Register'}
          </S.SubmitButton>
        </Flex>
      </form>
    </S.SignUpForm>
  );
};

export default SignUpForm;
