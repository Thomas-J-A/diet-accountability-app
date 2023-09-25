import { GraphQLError } from 'graphql';
import { HydratedDocument } from 'mongoose';
import {
  RegisterInput,
  RegisterPayload,
  User as UserType,
} from '../__generated__/resolvers-types';
import User, { IUser } from '../models/user.model';
import ErrorCodes from '../types/error-codes';

export const register = async (input: RegisterInput) => {
  const { firstName, lastName, email, password } = input;

  // Check if a user with that email address already exists
  const existingUser = await User.findOne({ email }).exec();

  if (existingUser) {
    throw new GraphQLError(`A user with the email ${email} already exists`, {
      extensions: {
        code: ErrorCodes.USERNAME_TAKEN,
      },
    });
  }

  // Validate password length
  if (password.length < 8) {
    throw new GraphQLError('Password must be at least 8 characters long', {
      extensions: {
        code: ErrorCodes.BAD_USER_INPUT,
      },
    });
  }

  // Create a new user
  const newUser: HydratedDocument<IUser> = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();

  // Transform user into correct type
  const transformedUser: UserType = {
    id: newUser._id.toString(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };

  // Create correct response format
  const response: RegisterPayload = {
    code: 'REGISTERED_USER',
    success: true,
    message: 'User registered successfully',
    user: transformedUser,
  };

  return response;
};

export default { register };
