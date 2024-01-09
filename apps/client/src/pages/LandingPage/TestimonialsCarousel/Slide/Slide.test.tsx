import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import Slide from './Slide';

describe('<Slide />', () => {
  const testimonialMock = {
    id: faker.number.int(),
    name: faker.person.fullName(),
    avatarUrl: faker.image.url(),
    alt: faker.lorem.sentence(3),
    content: faker.lorem.sentence(),
    rating: faker.number.int({ min: 1, max: 5 }),
  };

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<Slide testimonial={testimonialMock} />);
  });

  it('should display name and review', () => {
    render(<Slide testimonial={testimonialMock} />);

    /**
     * getByText method appears to look for an exact match
     * so RegExp constructor is used here
     */
    expect(
      screen.getByText(new RegExp(testimonialMock.name, 'i')),
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(testimonialMock.content, 'i')),
    ).toBeInTheDocument();
  });

  it('should render stars matching the rating', () => {
    render(<Slide testimonial={testimonialMock} />);

    const stars = screen.getAllByRole('presentation');
    expect(stars).toHaveLength(testimonialMock.rating);
  });
});
