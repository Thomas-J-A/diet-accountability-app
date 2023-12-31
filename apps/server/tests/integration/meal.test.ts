/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';
import { ApolloServer } from '@apollo/server';
import { faker } from '@faker-js/faker';
import { HydratedDocument, Types } from 'mongoose';
import { Context } from '../../src/auth/context';
import { IUser } from '../../src/models/user.model';
import { IMeal } from '../../src/models/meal.model';
import createApolloServer from '../../src/utils/create-apollo-server';
import { setUpDb, clearDb, closeDb } from '../helpers/db';
import { seedDayEvent, seedMeal, seedUser } from '../helpers/seeders';
import { CREATE_MEAL, UPDATE_MEAL } from '../helpers/mutations';
import {
  LocationEnum,
  MealTypeEnum,
  CreateMealPayload,
  UpdateMealPayload,
} from '../../src/__generated__/resolvers-types';

let testServer: ApolloServer<Context>;
beforeAll(() => (testServer = createApolloServer()));

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
  // The following mutations require an authenticated user
  let user: HydratedDocument<IUser>;
  beforeEach(async () => (user = await seedUser()));

  describe('createMeal', () => {
    it('should create a meal and create a day event if not existing', async () => {
      /**
       * 'date' field must be serialized manually since Date type is a
       * custom scalar and there is no Apollo Link in testing
       */
      const mealData = {
        date: '2023-10-12',
        description: faker.lorem.words(5),
        location: LocationEnum.Home,
        rating: 5,
        type: MealTypeEnum.Breakfast,
        photoKeys: [],
      };

      const res = await testServer.executeOperation<{
        createMeal: CreateMealPayload;
      }>(
        { query: CREATE_MEAL, variables: { mealData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.createMeal.message).toBe(
        'Meal was successfully added and DayEvent was created',
      );
      expect(res.body.singleResult.data?.createMeal.meal).toBeDefined();
      expect(res.body.singleResult.data?.createMeal.dayEvent).toBeDefined();
    });

    it('should create a meal and update a day event if existing', async () => {
      /**
       * Seed a dayEvent for authed user with same date as new meal
       * 'date' stored as a Date object in db, but sent as a serialized string
       */
      await seedDayEvent({
        user: user._id,
        date: new Date('2023-10-12T00:00:00Z'),
      });

      const mealData = {
        date: '2023-10-12',
        description: faker.lorem.words(5),
        location: LocationEnum.Home,
        rating: 5,
        type: MealTypeEnum.Breakfast,
        photoKeys: [],
      };

      const res = await testServer.executeOperation<{
        createMeal: CreateMealPayload;
      }>(
        { query: CREATE_MEAL, variables: { mealData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.createMeal.message).toBe(
        'Meal was successfully added and DayEvent was updated',
      );
      expect(res.body.singleResult.data?.createMeal.meal).toBeDefined();
      expect(res.body.singleResult.data?.createMeal.dayEvent).toBeDefined();
    });

    it('should return an error if rating is less than 1', async () => {
      const mealData = {
        date: '2023-10-12',
        description: faker.lorem.words(5),
        location: LocationEnum.Home,
        rating: 0,
        type: MealTypeEnum.Breakfast,
        photoKeys: [],
      };

      const res = await testServer.executeOperation(
        { query: CREATE_MEAL, variables: { mealData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Rating must be between 1 and 10 inclusive',
      );
    });

    it('should return an error if rating is more than 10', async () => {
      const mealData = {
        date: '2023-10-12',
        description: faker.lorem.words(5),
        location: LocationEnum.Home,
        rating: 11,
        type: MealTypeEnum.Breakfast,
        photoKeys: [],
      };

      const res = await testServer.executeOperation(
        { query: CREATE_MEAL, variables: { mealData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Rating must be between 1 and 10 inclusive',
      );
    });

    it('should return an error if description is more than 60 characters', async () => {
      const mealData = {
        date: '2023-10-12',
        description: faker.lorem.words(100),
        location: LocationEnum.Home,
        rating: 5,
        type: MealTypeEnum.Breakfast,
        photoKeys: [],
      };

      const res = await testServer.executeOperation(
        { query: CREATE_MEAL, variables: { mealData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'Description must not exceed 60 characters',
      );
    });
  });

  describe('updateMeal', () => {
    /**
     * 'rating' and 'description' validations use same methods internally as
     * createMeal mutation so that functionality is not tested again here
     */

    // The following tests require a pre-existing meal document in the database
    let meal: HydratedDocument<IMeal>;
    beforeEach(async () => (meal = await seedMeal({ rating: 6 })));

    it('should update a meal', async () => {
      // Update rating to 8
      const res = await testServer.executeOperation<{
        updateMeal: UpdateMealPayload;
      }>(
        {
          query: UPDATE_MEAL,
          variables: {
            id: meal._id.toString(),
            updatedMealData: { rating: 8 },
          },
        },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.updateMeal.message).toBe(
        'Meal was successfully updated',
      );
      expect(res.body.singleResult.data?.updateMeal.meal.rating).toBe(8);
    });

    it("should return an error if 'id' is not an ObjectId", async () => {
      const fakeId = 'Clearly not an ObjectId';

      const res = await testServer.executeOperation(
        {
          query: UPDATE_MEAL,
          variables: { id: fakeId, updatedMealData: {} },
        },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        `'${fakeId}' is not a valid ObjectId`,
      );
    });

    it('should return an error if no fields were updated', async () => {
      const res = await testServer.executeOperation(
        {
          query: UPDATE_MEAL,
          variables: { id: meal._id.toString(), updatedMealData: {} },
        },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'No updated values were provided',
      );
    });

    it("should return an error if meal with passed 'id' not found", async () => {
      const fakeButStillValidObjectId = new Types.ObjectId();

      const res = await testServer.executeOperation(
        {
          query: UPDATE_MEAL,
          variables: {
            id: fakeButStillValidObjectId.toString(),
            updatedMealData: { rating: 8 },
          },
        },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'RESOURCE_NOT_FOUND',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        `A meal with id of ${fakeButStillValidObjectId.toString()} was not found`,
      );
    });
  });
});
