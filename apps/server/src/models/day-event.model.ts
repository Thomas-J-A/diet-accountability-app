import { Schema, Document, Types, model } from 'mongoose';
import { HealthyHabit } from '../__generated__/resolvers-types';

// Document interface
export interface IDayEvent extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  date: number;
  healthyHabits: HealthyHabit[];
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
    type: Number,
    required: true,
  },
  healthyHabits: [
    {
      type: String,
      enum: HealthyHabit,
    },
  ],
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
  ],
});

const DayEvent = model<IDayEvent>('DayEvent', dayEventSchema);

export default DayEvent;
