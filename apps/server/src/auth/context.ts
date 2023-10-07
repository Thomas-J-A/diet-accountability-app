/* eslint-disable @typescript-eslint/require-await */
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import env from '../configs/env';
import { isString } from '../helpers/type-guards';
import ErrorCodes from '../types/error-codes';

// Interface for contextValue
export interface Context {
  currentUser: JwtPayload | null;
}

// Returns currentUser in context (possibly null)
export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<Context> => {
  const authorization = req.headers.authorization ?? '';

  if (authorization) {
    try {
      // Remove 'Bearer' prefix
      const token = authorization.split(' ')[1];

      // Verify token
      const user = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

      // Ensure that payload is not a string value
      // (In edge cases verify function can return payload as a string)
      if (isString(user)) {
        throw new GraphQLError('Token is invalid', {
          extensions: {
            code: ErrorCodes.TOKEN_INVALID,
          },
        });
      }

      // Optionally fetch entire user document, if more data needed
      // const user = await User.findById(user.sub);

      // Valid token sent
      return { currentUser: user };
    } catch (err) {
      // If error is related to an expired token, client needs to know so it can ask for a refresh
      if (err instanceof TokenExpiredError) {
        throw new GraphQLError('Token has expired', {
          extensions: { code: ErrorCodes.TOKEN_EXPIRED },
        });
      }

      // Else, throw a less specific error
      throw new GraphQLError('Token is invalid', {
        extensions: { code: ErrorCodes.TOKEN_INVALID },
      });
    }
  }

  // No token found
  return { currentUser: null };
};
