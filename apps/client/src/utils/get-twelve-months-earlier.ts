const getTwelveMonthsEarlier = (date: Date): Date => {
  // Make a copy to avoid modifying original date
  const copiedDate = new Date(date);

  // Subtract 12 months from the copied date
  // setMonth implementation handles changing the year accordingly
  copiedDate.setMonth(copiedDate.getMonth() - 12);

  // Set the day to 1 to get the first day of the month
  copiedDate.setDate(1);

  return copiedDate;
};

export default getTwelveMonthsEarlier;
