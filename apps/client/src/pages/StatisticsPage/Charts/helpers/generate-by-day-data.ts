import { addDays, isSameDay, format } from 'date-fns';
import { Meal, DayEvent } from '../../../../__generated__/graphql';

// Calculate the average rating of 1-3 meals in a single day
const calculateAverageRating = (meals: Meal[]) => {
  const sumRatings = meals.reduce((acc, meal) => acc + meal.rating, 0);
  const averageRating = sumRatings / meals.length;

  return averageRating;
};

// Massage array of dayEvent objects into format suitable for line chart
// representing average ratings of any recorded meals each day
const generateByDayData = (
  dayEvents: DayEvent[],
  timeframe: 7 | 30,
  startDate: Date,
) => {
  const averageRatings: { date: string; averageRating: number | null }[] = [];

  for (let i = 0; i < timeframe; i++) {
    // Get current date in loop
    const date = addDays(startDate, i);

    // Find dayEvent for current date in loop
    const dayEvent = dayEvents.find((de) => isSameDay(de.date, date));

    // Format date for chart X axis label
    const formattedDate = format(date, 'd');

    if (dayEvent?.meals.length) {
      // Meals have been recorded for this day, so calculate average rating
      const averageRating = calculateAverageRating(dayEvent.meals);
      averageRatings.push({ date: formattedDate, averageRating });
    } else {
      // No meals recorded for this day
      averageRatings.push({ date: formattedDate, averageRating: null });
    }
  }

  return averageRatings;
};

export default generateByDayData;
