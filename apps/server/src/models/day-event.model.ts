import { Schema, Document, Types, model } from 'mongoose';
import { GraphQLError } from 'graphql';
import { HealthyHabitEnum } from '../__generated__/resolvers-types';
import Meal from '../models/meal.model';
import ErrorCodes from '../types/error-codes';

// Document interface
export interface IDayEvent extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  date: Date;
  healthyHabits: HealthyHabitEnum[];
  meals: Types.ObjectId[];
}

// Schema
const dayEventSchema = new Schema<IDayEvent>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  healthyHabits: [
    {
      type: String,
      enum: HealthyHabitEnum,
    },
  ],
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
  ],
});

// Deletes all meals associated with a deleted dayEvent document
dayEventSchema.pre<IDayEvent>(
  'deleteOne',
  { document: true, query: false },
  async function () {
    try {
      // Delete all meals in the dayEvent's meal list
      await Meal.deleteMany({ _id: { $in: this.meals } }).exec();
    } catch (err) {
      throw new GraphQLError('An error occurred while deleting the day event', {
        extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
      });
    }
  },
);

const DayEvent = model<IDayEvent>('DayEvent', dayEventSchema);

export default DayEvent;
