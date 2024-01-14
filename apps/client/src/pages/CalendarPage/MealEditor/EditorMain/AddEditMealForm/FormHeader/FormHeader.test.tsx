import { render, screen } from '@testing-library/react';
import FormHeader from './FormHeader';
import { MealTypeEnum } from '../../../../../../__generated__/graphql';
import setup from '../../../../../../../tests/helpers/setup';

describe('<FormHeader />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <FormHeader setFormMode={jest.fn()} activeTab={MealTypeEnum.Breakfast} />,
    );
  });

  it('should dynamically changed heading text', () => {
    render(
      <FormHeader setFormMode={jest.fn()} activeTab={MealTypeEnum.Lunch} />,
    );

    expect(
      screen.getByRole('heading', { name: /record your lunch/i }),
    ).toBeInTheDocument();
  });

  it('should update form mode when clicking back button', async () => {
    // Mock state setter function which is invoked when clicking back button
    const setFormModeMock = jest.fn();

    const { user } = setup(
      <FormHeader
        setFormMode={setFormModeMock}
        activeTab={MealTypeEnum.Breakfast}
      />,
    );

    await user.click(screen.getByRole('button', { name: /go back/i }));

    expect(setFormModeMock).toHaveBeenCalled();
  });
});
