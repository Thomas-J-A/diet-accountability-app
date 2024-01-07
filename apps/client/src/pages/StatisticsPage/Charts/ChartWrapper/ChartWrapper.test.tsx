import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import ChartWrapper from './ChartWrapper';

describe('<ChartWrapper />', () => {
  const heading = faker.lorem.words(3);

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <ChartWrapper heading={heading}>
        <p>foo</p>
      </ChartWrapper>,
    );
  });

  it('should display a chart heading', () => {
    render(
      <ChartWrapper heading={heading}>
        <p>foo</p>
      </ChartWrapper>,
    );

    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  it('should render child component', () => {
    render(
      <ChartWrapper heading={heading}>
        <p>foo</p>
      </ChartWrapper>,
    );

    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
