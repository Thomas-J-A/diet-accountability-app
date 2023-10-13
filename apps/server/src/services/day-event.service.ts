import { GraphQLError } from 'graphql';
import {
  DayEventsInput,
  AddStickerInput,
  RemoveStickerInput,
} from '../__generated__/resolvers-types';
import DayEvent from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';

// Retrieves day events for a given date range and user ID
const getDayEvents = async (dateRange: DayEventsInput, userId: string) => {
  const { endDate, startDate } = dateRange;

  // Find all DayEvent records between start and end dates for current user
  const dayEvents = await DayEvent.find({
    user: userId,
    date: { $lte: endDate, $gte: startDate },
  })
    .sort({ date: 'asc' })
    .exec();

  return dayEvents;
};

// Adds HealthyHabit sticker (as a string) to the dayEvent document
const addSticker = async (stickerData: AddStickerInput, userId: string) => {
  const { date, healthyHabit } = stickerData;

  // Find corresponding dayEvent document, if it exists
  let dayEvent = await DayEvent.findOne({ user: userId, date }).exec();

  // Flag to help compose the 'message' value in response
  const existsDayEvent = !!dayEvent;

  if (dayEvent) {
    // Update healthyHabits list for that dayEvent
    dayEvent.healthyHabits = [...dayEvent.healthyHabits, healthyHabit];
    await dayEvent.save();
  } else {
    // Create and save new dayEvent
    dayEvent = new DayEvent({
      user: userId,
      date,
      healthyHabits: [healthyHabit],
    });

    await dayEvent.save();
  }

  // Format response to match schema
  const response = {
    code: 200,
    success: true,
    message: `HealthyHabit was successfully added and DayEvent was ${
      existsDayEvent ? 'updated' : 'created'
    }`,
    dayEvent,
  };

  return response;
};

const removeSticker = async (
  stickerData: RemoveStickerInput,
  userId: string,
) => {
  const { date, healthyHabit } = stickerData;

  // Find corresponding dayEvent document, if it exists
  const dayEvent = await DayEvent.findOne({
    user: userId,
    date,
  }).exec();

  // Ensure a dayEvent was found
  if (!dayEvent) {
    throw new GraphQLError(
      'A day event with this date does not exist for the current user',
      { extensions: { code: ErrorCodes.RESOURCE_NOT_FOUND } },
    );
  }

  // Ensure healthyHabit to be removed exists in list
  if (!dayEvent.healthyHabits.includes(healthyHabit)) {
    throw new GraphQLError(
      `${healthyHabit} does not appear in the list of HealthyHabits for this day`,
      { extensions: { code: ErrorCodes.BAD_USER_INPUT } },
    );
  }

  // Filter out healthyHabit from list
  dayEvent.healthyHabits = dayEvent.healthyHabits.filter(
    (habit) => habit !== healthyHabit,
  );

  await dayEvent.save();

  // Format response to match schema
  const response = {
    code: 200,
    success: true,
    message: `${healthyHabit} was successfully removed`,
    dayEvent,
  };

  return response;
};

export default { getDayEvents, addSticker, removeSticker };
