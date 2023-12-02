import { DayEvent, MealTypeEnum } from '../../../../__generated__/graphql';

// Massage array of dayEvent objects into format suitable for bar chart
// representing average ratings per meal type (breakfast, lunch, dinner)
const generateByMealData = (dayEvents: DayEvent[]) => {
  // Get sum of ratings and total count of each meal type
  const sumAndCounts = dayEvents.reduce(
    (acc, dayEvent) => {
      dayEvent.meals.forEach((meal) => {
        // For each meal in day, increase sum and total count
        acc[meal.type].sumRatings += meal.rating;
        acc[meal.type].count += 1;
      });

      return acc;
    },
    {
      [MealTypeEnum.Breakfast]: { sumRatings: 0, count: 0 },
      [MealTypeEnum.Lunch]: { sumRatings: 0, count: 0 },
      [MealTypeEnum.Dinner]: { sumRatings: 0, count: 0 },
    },
  );

  // Generate average ratings for each meal type
  const averageRatings = Object.keys(sumAndCounts).map((mealType) => {
    const { sumRatings, count } = sumAndCounts[mealType as MealTypeEnum];

    return {
      mealType,
      averageRating: count > 0 ? sumRatings / count : 0,
    };
  });

  return averageRatings;
};

export default generateByMealData;
