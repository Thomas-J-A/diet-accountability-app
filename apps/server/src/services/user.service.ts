// TODO: create a reusable function which extracts logic for formatting
// a user from a mongoose document into corresponding graphql type
import { GraphQLError } from 'graphql';
import { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  SignUpInput,
  SignUpPayload,
  SignInInput,
  SignInPayload,
  User as UserType,
} from '../__generated__/resolvers-types';
import User, { IUser } from '../models/user.model';
import ErrorCodes from '../types/error-codes';
import generateToken from '../utils/generate-token';

export const signUp = async (input: SignUpInput) => {
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

  // Format user into correct type
  const formattedUser: UserType = {
    id: newUser._id.toString(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };

  // Generate access token
  // TODO: refresh token
  const accessToken = generateToken(formattedUser.id);

  // Create correct response format
  const response: SignUpPayload = {
    code: 'SIGNED_UP_USER',
    success: true,
    message: 'User signed up successfully',
    user: formattedUser,
    tokens: {
      accessToken,
      // refreshToken,
    },
  };

  return response;
};

const signIn = async (input: SignInInput) => {
  const { email, password } = input;

  // Check if a user exists in database with given email
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: ErrorCodes.INVALID_CREDENTIALS,
      },
    });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: ErrorCodes.INVALID_CREDENTIALS,
      },
    });
  }

  // Format user into correct type
  const formattedUser: UserType = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  // Generate access token
  // TODO: refresh token
  const accessToken = generateToken(formattedUser.id);

  // Return user and tokens
  const response: SignInPayload = {
    code: 'SIGNED_IN_USER',
    success: true,
    message: 'User signed in successfully',
    user: formattedUser,
    tokens: {
      accessToken,
    },
  };

  return response;
};

// TODO: signOut

export default { signUp, signIn };
