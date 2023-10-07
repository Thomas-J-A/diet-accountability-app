import { Schema, Document, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import DayEvent from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';

// Document interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
// Mongoose validation used as a second validation layer for added security
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true },
);

// Hash password before saving/updating a user (if it has changed)
userSchema.pre<IUser>('save', async function () {
  try {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    throw new GraphQLError('An error occurred while saving the user', {
      extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
    });
  }
});

// Deletes all dayEvents associated with a deleted user document
userSchema.pre<IUser>(
  'deleteOne',
  { document: true, query: false },
  async function () {
    try {
      // Find all associated dayEvent documents
      const dayEvents = await DayEvent.find({ user: this._id }).exec();

      // Call method on each individual document to trigger pre('deleteOne', ...) middleware
      for (const dayEvent of dayEvents) {
        await dayEvent.deleteOne();
      }
    } catch (err) {
      throw new GraphQLError('An error occurred while deleting the user', {
        extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
      });
    }
  },
);

const User = model<IUser>('User', userSchema);

export default User;
