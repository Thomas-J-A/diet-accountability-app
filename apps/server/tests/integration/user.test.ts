/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';
import { ApolloServer } from '@apollo/server';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import { Context } from '../../src/auth/context';
import createApolloServer from '../../src/utils/create-apollo-server';
import { setUpDb, clearDb, closeDb } from '../helpers/db';
import { seedUser } from '../helpers/seeders';
import { SIGN_UP, SIGN_IN, DELETE_USER } from '../helpers/mutations';
import {
  SignUpPayload,
  SignInPayload,
  DeleteUserPayload,
} from '../../src/__generated__/resolvers-types';

// Create an instance of Apollo Server to execute operations on
let testServer: ApolloServer<Context>;
beforeAll(() => (testServer = createApolloServer()));

// Handle test database lifecycle
beforeAll(async () => {
  await setUpDb();
});

afterEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await closeDb();
});

describe('Mutations', () => {
  describe('signUp', () => {
    it('should register a new user and return access token', async () => {
      const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const res = await testServer.executeOperation<{ signUp: SignUpPayload }>(
        { query: SIGN_UP, variables: { userData } },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.signUp.user?.firstName).toBe(
        userData.firstName,
      );
      expect(
        res.body.singleResult.data?.signUp.tokens?.accessToken,
      ).toBeDefined();
    });

    it('should return an error if user with that email already exists', async () => {
      // Seed a user
      const { email } = await seedUser();

      // Create a new user with same email
      const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: email,
        password: faker.internet.password(),
      };

      const res = await testServer.executeOperation(
        { query: SIGN_UP, variables: { userData } },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'USERNAME_TAKEN',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        `A user with the email ${userData.email} already exists`,
      );
    });

    it('should return an error if password is less than 8 characters', async () => {
      const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 4 }),
      };

      const res = await testServer.executeOperation(
        { query: SIGN_UP, variables: { userData } },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Password must be at least 8 characters long',
      );
    });
  });

  describe('signIn', () => {
    it('should authenticate user and return access token', async () => {
      // Password is hashed so I need a plaintext reference here
      const password = faker.internet.password({ length: 10 });

      const { email } = await seedUser({ password });

      const res = await testServer.executeOperation<{ signIn: SignInPayload }>(
        {
          query: SIGN_IN,
          variables: {
            credentials: { email, password },
          },
        },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.signIn.user?.email).toBe(email);
      expect(
        res.body.singleResult.data?.signIn.tokens?.accessToken,
      ).toBeDefined();
    });

    it("should return an error if user with that email doesn't exist", async () => {
      const res = await testServer.executeOperation(
        {
          query: SIGN_IN,
          variables: {
            credentials: {
              email: faker.internet.email(),
              password: faker.internet.password({ length: 10 }),
            },
          },
        },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'INVALID_CREDENTIALS',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Email or password is incorrect',
      );
    });

    it("should return an error if passwords don't match", async () => {
      const { email } = await seedUser();

      const res = await testServer.executeOperation(
        {
          query: SIGN_IN,
          variables: {
            credentials: {
              email,
              password: faker.internet.password({ length: 10 }),
            },
          },
        },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'INVALID_CREDENTIALS',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Email or password is incorrect',
      );
    });
  });

  describe('deleteUser', () => {
    // TODO: add tests which check whether associated data (meals, dayEvents) are also deleted
    it('should delete user and associated data', async () => {
      const { _id } = await seedUser();

      const res = await testServer.executeOperation<{
        deleteUser: DeleteUserPayload;
      }>(
        {
          query: DELETE_USER,
          variables: {
            id: _id.toString(),
          },
        },
        { contextValue: { currentUser: { sub: _id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.deleteUser.message).toBe(
        `User with id ${_id.toString()} and their associated data were deleted successfully`,
      );
    });

    it('should return an error if user is not authenticated', async () => {
      const { _id } = await seedUser();

      const res = await testServer.executeOperation(
        { query: DELETE_USER, variables: { id: _id.toString() } },
        { contextValue: { currentUser: null } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'UNAUTHENTICATED',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'You must be authenticated to access this data',
      );
    });

    it("should return an error if current user and id don't match", async () => {
      const { _id } = await seedUser();

      const res = await testServer.executeOperation(
        {
          query: DELETE_USER,
          variables: { id: new Types.ObjectId().toString() },
        },
        { contextValue: { currentUser: { sub: _id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'FORBIDDEN',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'You may only delete your own account',
      );
    });
  });
});
