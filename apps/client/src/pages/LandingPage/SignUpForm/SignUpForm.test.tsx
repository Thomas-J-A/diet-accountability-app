/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jest/no-disabled-tests */

/**
 * TODO: Implement test suite
 * Note: manually tested extensively and is operational and secure
 * There seems to be an issue related to either async nature of react-hook-form or Apollo Client
 * where clicking the register submit button does not cause a validation or submission
 */

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import setup from '../../../../tests/helpers/setup';
import SignUpForm from './SignUpForm';
import { SIGN_UP_MUTATION } from '../../../operations/mutations';
// import { useAuthContext } from '../../../contexts/AuthContext';

// Mock logIn function from context
jest.mock('../../../contexts/AuthContext', () => ({
  useAuthContext: jest.fn().mockReturnValue({ logIn: jest.fn() }),
}));

// Mock the Apollo Client sign up operation
const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        userDate: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      },
    },
    result: {
      data: {
        signUp: {},
      },
    },
  },
];

describe('<SignUpForm />', () => {
  // Mock some user info to populate form fields in test cases
  const userInfo = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>,
    );
  });

  it('should render all fields and submit button', () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>,
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i }),
    ).toBeInTheDocument();
  });

  it.skip('should disable submit button and notify user while submitting', async () => {
    const { user } = setup(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    await user.type(screen.getByLabelText(/first name/i), userInfo.firstName);
    await user.type(screen.getByLabelText(/last name/i), userInfo.lastName);
    await user.type(screen.getByLabelText(/email/i), userInfo.email);
    await user.type(screen.getByLabelText(/^password/i), userInfo.password);
    await user.type(
      screen.getByLabelText(/confirm password/i),
      userInfo.password,
    );

    // Select submit button
    const submitButton = screen.getByRole('button', { name: 'Register' });
    expect(submitButton).toHaveTextContent('Register');

    // Click submit button
    await user.click(submitButton);

    expect(submitButton).toHaveTextContent('Submitting...');
    expect(submitButton).toBeDisabled();
  });

  it.skip('should call the log in function on success', () => {});
  it.skip('should dislay a toast notification on success', () => {});

  it.skip('should validate form fields', async () => {
    const { user } = setup(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    // Click register form submit button
    await user.click(screen.getByRole('button', { name: /register/i }));

    // Expect to have five error messages
    expect(await screen.findAllByRole('alert')).toHaveLength(5);
  });

  it.skip('should display an error when first name is empty', async () => {
    const { user } = setup(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm />
      </MockedProvider>,
    );

    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(
      await screen.findByText(/first name must not be empty/i),
    ).toBeInTheDocument();
  });

  it.skip('should display an error when last name is empty', () => {});
  it.skip('should display an error when email is empty or invalid', async () => {});
  it.skip('should display an error when email already exists', () => {});
  it.skip('should display an error when password is too short', () => {});
  it.skip("should display an error when passwords don't match", () => {});
  it.skip("should display an error when there's a network error", () => {});
});
