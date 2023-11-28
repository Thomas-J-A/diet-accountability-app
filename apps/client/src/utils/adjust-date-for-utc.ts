// When apollo-link-scalars lib serializes Date values in Apollo Link it coerces value to UTC
// which can set Date to previous/following day, so this function adjusts value pre-emptively
const adjustDateForUTC = (date: Date): Date => {
  // Get the current timezone offset in minutes
  const offsetMinutes = date.getTimezoneOffset();

  // Calculate the adjusted timestamp for the provided date
  const adjustedTimestamp = date.getTime() - offsetMinutes * 60 * 1000;

  // Create a new Date object using the adjusted timestamp
  const adjustedDate = new Date(adjustedTimestamp);

  // Set time to midnight in the adjusted local timezone
  // adjustedDate.setHours(0, 0, 0, 0);

  return adjustedDate;
};

export default adjustDateForUTC;
