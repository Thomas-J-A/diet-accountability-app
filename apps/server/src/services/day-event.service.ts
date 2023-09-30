import { DayEventsInput, DayEvent } from '../__generated__/resolvers-types';
import DayEventModel from '../models/day-event.model';
import { IMeal } from '../models/meal.model';

const getDayEvents = async (input: DayEventsInput, userId: string) => {
  const { endDate, startDate } = input;

  // Find all DayEvent records between start and end dates for current user
  const dayEvents = await DayEventModel.find({
    user: userId,
    date: { $lte: endDate, $gte: startDate },
  })
    .populate<{ meals: IMeal[] }>('meals')
    .exec();

  // Format events to fit GraphQL schema
  const dayEventsFormatted: DayEvent[] = dayEvents.map((d) => ({
    id: d._id.toString(),
    date: d.date,
    healthyHabits: d.healthyHabits,
    meals: d.meals,
  }));

  return dayEventsFormatted;
};

export default { getDayEvents };
