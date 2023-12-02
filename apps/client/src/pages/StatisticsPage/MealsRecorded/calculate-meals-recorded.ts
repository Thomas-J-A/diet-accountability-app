import { DayEvent } from '../../../__generated__/graphql';

// Calculate total recorded meals over period compared to total possible meals
const calculateMealsRecorded = (
  data: DayEvent[],
  timeframe: 7 | 30,
): string => {
  const mealsRecorded = data.reduce(
    (acc, currentValue) => acc + currentValue.meals.length,
    0,
  );

  const mealsPossible = timeframe * 3;

  return `${mealsRecorded}/${mealsPossible}`;
};

export default calculateMealsRecorded;
