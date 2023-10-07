import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import { SignUpInput, SignInInput } from '../__generated__/resolvers-types';
import User from '../models/user.model';
import ErrorCodes from '../types/error-codes';
import generateToken from '../utils/generate-token';

// Registers a new user in the database
const signUp = async (userData: SignUpInput) => {
  const { firstName, lastName, email, password } = userData;

  // Check if a user with that email address already exists
  const existingUser = await User.findOne({ email }).exec();

  if (existingUser) {
    throw new GraphQLError(`A user with the email ${email} already exists`, {
      extensions: { code: ErrorCodes.USERNAME_TAKEN },
    });
  }

  // Validate password length
  if (password.length < 8) {
    throw new GraphQLError('Password must be at least 8 characters long', {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }

  // Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();

  // Generate access token
  // TODO: refresh token
  const accessToken = generateToken(newUser._id.toString());

  // Format response to match schema
  const response = {
    code: 201,
    success: true,
    message: 'User was signed up successfully',
    user: newUser,
    tokens: {
      accessToken,
      // refreshToken,
    },
  };

  return response;
};

// Authenticates the user
const signIn = async (credentials: SignInInput) => {
  const { email, password } = credentials;

  // Check if a user exists in database with given email
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: { code: ErrorCodes.INVALID_CREDENTIALS },
    });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: { code: ErrorCodes.INVALID_CREDENTIALS },
    });
  }

  // Generate access token
  // TODO: refresh token
  const accessToken = generateToken(user._id.toString());

  // Format response to match schema
  const response = {
    code: 200,
    success: true,
    message: 'User was signed in successfully',
    user,
    tokens: {
      accessToken,
    },
  };

  return response;
};

// Deletes the currently authenticated user
const deleteUser = async (id: string, userId: string) => {
  // Ensure authed user is deleting their own account
  if (id !== userId) {
    throw new GraphQLError('You may only delete your own account', {
      extensions: { code: ErrorCodes.FORBIDDEN },
    });
  }

  // Look for user in database
  const user = await User.findById(id).exec();

  // Ensure a user with that id was found (JWT token may come from any server)
  if (!user) {
    throw new GraphQLError(`A user with id of ${id} was not found`, {
      extensions: { code: ErrorCodes.RESOURCE_NOT_FOUND },
    });
  }

  // Delete user - mongoose middleware will delete associated DayEvents and Meals in a cascade
  const deletedUser = await user.deleteOne();

  // Format response to match schema
  const response = {
    code: 200,
    success: true,
    message: `User with id ${id} and their associated data were deleted successfully`,
    user: deletedUser,
  };

  return response;
};

export default { signUp, signIn, deleteUser };
