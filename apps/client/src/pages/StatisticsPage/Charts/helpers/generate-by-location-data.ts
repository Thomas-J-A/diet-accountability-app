import { DayEvent, LocationEnum } from '../../../../__generated__/graphql';

// Massage array of dayEvent objects into format suitable for
// area chart representing average ratings per location
const generateByLocationData = (dayEvents: DayEvent[]) => {
  // Get sum of ratings and total count of each meal location
  const sumAndCounts = dayEvents.reduce(
    (acc, dayEvent) => {
      dayEvent.meals.forEach((meal) => {
        acc[meal.location].sumRatings += meal.rating;
        acc[meal.location].count += 1;
      });

      return acc;
    },
    {
      [LocationEnum.Home]: { sumRatings: 0, count: 0 },
      [LocationEnum.Work]: { sumRatings: 0, count: 0 },
      [LocationEnum.Restaurant]: { sumRatings: 0, count: 0 },
      [LocationEnum.Travel]: { sumRatings: 0, count: 0 },
      [LocationEnum.Outdoors]: { sumRatings: 0, count: 0 },
      [LocationEnum.Other]: { sumRatings: 0, count: 0 },
    },
  );

  // Generate average ratings for each meal location
  const averageRatings = Object.keys(sumAndCounts).map((mealLocation) => {
    const { sumRatings, count } = sumAndCounts[mealLocation as LocationEnum];

    return {
      mealLocation,
      averageRating: count > 0 ? sumRatings / count : 0,
    };
  });

  return averageRatings;
};

export default generateByLocationData;
