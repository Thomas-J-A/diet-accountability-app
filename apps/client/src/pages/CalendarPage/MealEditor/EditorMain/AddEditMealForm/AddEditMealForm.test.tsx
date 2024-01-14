/**
 * TODO: Refactor test suite to use MockedProvider component from Apollo Client lib which allows
 * more realistic testing of the functionality. Add more comprehensive tests.
 * Tests need to check that mocks APIs are called and that the UI displays
 * success messages in response
 */

import { fireEvent, render, screen } from '@testing-library/react';
// import { useMutation as useMutationMock } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { Theme } from '@radix-ui/themes';
import AddEditMealForm from './AddEditMealForm';
import { MealTypeEnum } from '../../../../../__generated__/graphql';
import setup from '../../../../../../tests/helpers/setup';

// Mock useMutation hook
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn().mockReturnValue([jest.fn()]),
}));

describe('<AddEditMealForm />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <Theme>
        <AddEditMealForm
          meal={undefined}
          formMode="ADD"
          setFormMode={jest.fn()}
          activeTab={MealTypeEnum.Breakfast}
        />
      </Theme>,
    );
  });

  it('should display form fields and submit button', () => {
    render(
      <Theme>
        <AddEditMealForm
          meal={undefined}
          formMode="ADD"
          setFormMode={jest.fn()}
          activeTab={MealTypeEnum.Breakfast}
        />
      </Theme>,
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('should display a note regarding temporary lack of photo uploads', () => {
    render(
      <Theme>
        <AddEditMealForm
          meal={undefined}
          formMode="ADD"
          setFormMode={jest.fn()}
          activeTab={MealTypeEnum.Breakfast}
        />
      </Theme>,
    );

    expect(
      screen.getByText(/photo uploads will return shortly/i),
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(/photos/i)).not.toBeInTheDocument();
  });

  it('should disable the submit button when the form is not dirty', () => {
    render(
      <Theme>
        <AddEditMealForm
          meal={undefined}
          formMode="ADD"
          setFormMode={jest.fn()}
          activeTab={MealTypeEnum.Breakfast}
        />
      </Theme>,
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it.skip('should disable the submit button while form is submitting', async () => {
    const { user } = setup(
      <Theme>
        <AddEditMealForm
          meal={undefined}
          formMode="ADD"
          setFormMode={jest.fn()}
          activeTab={MealTypeEnum.Breakfast}
        />
      </Theme>,
    );

    // Fill out meal description (which is required)
    await user.type(
      screen.getByLabelText(/description/i),
      faker.lorem.sentence(),
    );

    // 'location' and 'rating' have default values already
    // await user.click(screen.getByRole('combobox'));
    // await user.click(screen.getByRole('option', { name: /restaurant/i }));

    /**
     * user-event lib not used here because I want to test
     * various aspects of the button before the async submission
     * finishes (user-event needs to be awaited)
     */
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveTextContent(/saving/i);
  });

  // it.skip('should display an error message when input is invalid', () => {});
  // it.skip('should display a success message after adding a meal', () => {});
  // it.skip('should display a success message after editing a meal', () => {});
  // it.skip('should display an error message after a failed submission', () => {});
});
