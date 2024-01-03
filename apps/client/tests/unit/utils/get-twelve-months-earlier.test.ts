import getTwelveMonthsEarlier from '../../../src/utils/get-twelve-months-earlier';

describe('getTwelveMonthsEarlier', () => {
  it('should return a date twelve months earlier', () => {
    // January 15, 2023
    const inputDate = new Date(2024, 1, 12);

    // January 1, 2022 (sets day to 1st of month)
    const expectedDate = new Date(2023, 1, 1);

    const result = getTwelveMonthsEarlier(inputDate);

    expect(result.getFullYear()).toBe(expectedDate.getFullYear());
    expect(result.getMonth()).toBe(expectedDate.getMonth());
    expect(result.getDate()).toBe(expectedDate.getDate());
  });
});
