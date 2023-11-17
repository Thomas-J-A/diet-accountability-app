import { format } from 'date-fns';

// Return a formatted string representing month and year
const formatMonthAndYear = (year: number, month: number) => {
  // Make a copy of date
  const dateCopy = new Date(year, month);

  // Format date into desired date as a string
  const formattedDate = format(dateCopy, "MMM ''yy");

  // Change month value to uppercase
  return formattedDate.toUpperCase();
};

export default formatMonthAndYear;
