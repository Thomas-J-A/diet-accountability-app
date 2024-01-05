// TODO: Implement all tests. Further research on timezones and mocking these is required.
import adjustDateForUTC from '../../../src/utils/adjust-date-for-utc';

describe('adjustDateForUTC', () => {
  afterEach(() => {
    // Reset getTimezoneOffset method to original
    // implementation after each test case
    jest.restoreAllMocks();
  });

  it('should return a UTC date as is', () => {
    // Create new, UTC date
    const utcDate = new Date(Date.UTC(2024, 0, 12, 6));

    // Adjust date
    const adjustedDate = adjustDateForUTC(utcDate);

    // Dates should match since input date is UTC to begin with
    expect(adjustedDate.getTime()).toBe(utcDate.getTime());
  });

  it.skip('should adjust a date in eastern timezone correctly', () => {
    // TODO: Implement test
    // // Set date to Japanese timezone (+8)
    // const japanDate = new Date(Date.UTC(2024, 0, 12, 6));
    // const timezoneOffsetHrs = 8;
    // japanDate.setHours(japanDate.getHours() + timezoneOffsetHrs);
    // // Mock method since it varies depending on timezone registered on local machine
    // jest.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValueOnce(-480); // UTC+8
    // // Adjust date
    // const adjustedDate = adjustDateForUTC(japanDate);
    // // Calculate expected value
    // const expected = japanDate.getTime() - -480 * 60 * 1000;
    // expect(adjustedDate.getTime()).toBe(expected);
  });

  it.skip('should adjust a date in western timezone correctly', () => {
    // TODO: Implement test
  });
});
