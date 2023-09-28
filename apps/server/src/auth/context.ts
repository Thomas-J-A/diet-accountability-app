/* eslint-disable @typescript-eslint/require-await */
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import env from '../configs/env';
import ErrorCodes from '../types/error-codes';

// Interface for contextValue
export interface Context {
  currentUser: string | JwtPayload | null;
}

// Returns currentUser in context (possibly null)
export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<Context> => {
  const token = req.headers.authorization ?? '';

  if (token) {
    try {
      // Remove 'Bearer' prefix
      const jwtToken = token.split(' ')[1];

      // Verify token
      const user = jwt.verify(jwtToken, env.ACCESS_TOKEN_SECRET);

      // Optionally fetch entire user document, if more data needed
      // const user = await User.findById(user.sub);

      // Valid token sent
      return { currentUser: user };
    } catch (err) {
      // If error is related to an expired token, client needs to know so it can ask for a refresh
      if (err instanceof TokenExpiredError) {
        throw new GraphQLError('Token has expired', {
          extensions: {
            code: ErrorCodes.TOKEN_EXPIRED,
          },
        });
      }

      // Else, throw a less specific error
      throw new GraphQLError('Token is invalid', {
        extensions: {
          code: ErrorCodes.TOKEN_INVALID,
        },
      });
    }
  }

  // No token found
  return { currentUser: null };
};
