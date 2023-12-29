import { Schema, Document, Types, model } from 'mongoose';
import { LocationEnum, MealTypeEnum } from '../__generated__/resolvers-types';

// Document interface
export interface IMeal extends Document {
  _id: Types.ObjectId;
  description: string;
  location: LocationEnum;
  rating: number;
  type: MealTypeEnum;
  photoKeys: string[];
}

// Schema
const mealSchema = new Schema<IMeal>({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: LocationEnum,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  type: {
    type: String,
    enum: MealTypeEnum,
    required: true,
  },

  // TODO: Make optional (requires changes to schema and resolver code too)
  photoKeys: [{ type: String, required: true }],
});

const Meal = model<IMeal>('Meal', mealSchema);

export default Meal;
