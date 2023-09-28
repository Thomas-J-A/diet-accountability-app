import { Schema, Document, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import ErrorCodes from '../types/error-codes';

// Document interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

// Schema
// Mongoose validation used as a second
// validation layer for added security
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

// TODO: Add static method for comparing password here instead of in resolver

// Hash password before saving/updating a user (if it has changed)
userSchema.pre<IUser>('save', async function (next) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    if (!this.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    throw new GraphQLError('An error occurred while saving the user', {
      extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR },
    });
  }
});

const User = model<IUser>('User', userSchema);

export default User;
