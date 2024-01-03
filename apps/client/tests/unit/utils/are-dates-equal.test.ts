import areDatesEqual from '../../../src/utils/are-dates-equal';

describe('areDatesEqual', () => {
  it('should return true for equal days and different times', () => {
    const date1 = new Date(2024, 1, 12, 12);
    const date2 = new Date(2024, 1, 12);

    expect(areDatesEqual(date1, date2)).toBeTruthy();
  });

  it('should return true for equal days in different timezones', () => {
    // String arguments convey different timezones more clearly
    const date1 = new Date('2024-01-12T12:00:00Z');
    const date2 = new Date('2024-01-12T12:00:00+0200');

    expect(areDatesEqual(date1, date2)).toBeTruthy();
  });

  it('should return false for different days and different times', () => {
    const date1 = new Date(2024, 1, 12, 12);
    const date2 = new Date(2024, 1, 13, 17);

    expect(areDatesEqual(date1, date2)).toBeFalsy();
  });

  it('should return false for different days and equal times', () => {
    const date1 = new Date(2024, 1, 12, 12);
    const date2 = new Date(2024, 1, 13, 12);

    expect(areDatesEqual(date1, date2)).toBeFalsy();
  });
});
