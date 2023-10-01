import { Schema, Document, Types, model } from 'mongoose';
import { Location, MealType } from '../__generated__/resolvers-types';

// Document interface
export interface IMeal extends Document {
  _id: Types.ObjectId;

  // Explicitly defined because it's added automatically and clashes with another type
  id: string;
  description: string;
  location: Location;
  rating: number;
  // photoUrls: string[];
  type: MealType;
}

// Schema
const mealSchema = new Schema<IMeal>({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: Location,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  // photoUrls: [String],
  type: {
    type: String,
    enum: MealType,
    required: true,
  },
});

const Meal = model<IMeal>('Meal', mealSchema);

export default Meal;
