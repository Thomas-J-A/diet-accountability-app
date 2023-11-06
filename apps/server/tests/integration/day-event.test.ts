/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';
import { ApolloServer } from '@apollo/server';
import { HydratedDocument } from 'mongoose';
import { Context } from '../../src/auth/context';
import { IUser } from '../../src/models/user.model';
import createApolloServer from '../../src/utils/create-apollo-server';
import { setUpDb, clearDb, closeDb } from '../helpers/db';
import { seedDayEvent, seedUser } from '../helpers/seeders';
import { DAY_EVENTS } from '../helpers/queries';
import { ADD_STICKER, REMOVE_STICKER } from '../helpers/mutations';
import {
  DayEvent,
  HealthyHabitEnum,
  AddStickerPayload,
  RemoveStickerPayload,
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

describe('Queries', () => {
  // The following mutations require an authenticated user
  let user: HydratedDocument<IUser>;
  beforeEach(async () => (user = await seedUser()));

  describe('dayEvents', () => {
    it('should return a list of day events for a given period', async () => {
      // Seed two day events for authed user
      await seedDayEvent({
        user: user._id,
        date: new Date('2000-01-01T00:00:00Z'),
      });

      await seedDayEvent({
        user: user._id,
        date: new Date('2000-01-02T00:00:00Z'),
      });

      /**
       * Date values are serialized by Apollo client in
       * running app but must be done manually in tests
       */
      const dateRange = {
        endDate: '2000-01-02',
        startDate: '2000-01-01',
      };

      const res = await testServer.executeOperation<{ dayEvents: DayEvent[] }>(
        { query: DAY_EVENTS, variables: { dateRange } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.dayEvents).toHaveLength(2);
      expect(res.body.singleResult.data?.dayEvents[0].date).toBe('2000-01-01');
      expect(res.body.singleResult.data?.dayEvents[1].date).toBe('2000-01-02');
    });
  });
});

describe('Mutations', () => {
  // The following mutations require an authenticated user
  let user: HydratedDocument<IUser>;
  beforeEach(async () => (user = await seedUser()));

  describe('addSticker', () => {
    it('should create a day event if not existing and add sticker to list of Healthy Habits', async () => {
      const stickerData = {
        date: '2000-01-01',
        healthyHabit: HealthyHabitEnum.Cardio,
      };
      const res = await testServer.executeOperation<{
        addSticker: AddStickerPayload;
      }>(
        { query: ADD_STICKER, variables: { stickerData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.addSticker.message).toBe(
        'HealthyHabit was successfully added and DayEvent was created',
      );
      expect(
        res.body.singleResult.data?.addSticker.dayEvent.healthyHabits,
      ).toContain(stickerData.healthyHabit);
    });

    it('should update a day event if existing and add sticker to list of Healthy Habits', async () => {
      await seedDayEvent({
        user: user._id,
        date: new Date('2000-01-01T00:00:00Z'),
      });

      const stickerData = {
        date: '2000-01-01',
        healthyHabit: HealthyHabitEnum.Cardio,
      };

      const res = await testServer.executeOperation<{
        addSticker: AddStickerPayload;
      }>(
        { query: ADD_STICKER, variables: { stickerData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.addSticker.message).toBe(
        'HealthyHabit was successfully added and DayEvent was updated',
      );
      expect(
        res.body.singleResult.data?.addSticker.dayEvent.healthyHabits,
      ).toContain(stickerData.healthyHabit);
    });
  });

  describe('removeSticker', () => {
    it("should remove 'healthyHabit' from day event", async () => {
      await seedDayEvent({
        user: user._id,
        date: new Date('2000-01-01T00:00:00Z'),
        healthyHabits: [HealthyHabitEnum.Cardio],
      });

      const stickerData = {
        date: '2000-01-01',
        healthyHabit: HealthyHabitEnum.Cardio,
      };

      const res = await testServer.executeOperation<{
        removeSticker: RemoveStickerPayload;
      }>(
        { query: REMOVE_STICKER, variables: { stickerData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeUndefined();
      expect(res.body.singleResult.data?.removeSticker.message).toBe(
        `${stickerData.healthyHabit} was successfully removed`,
      );
      expect(
        res.body.singleResult.data?.removeSticker.dayEvent.healthyHabits,
      ).not.toContain(stickerData.healthyHabit);
    });

    it("should return an error if day event not found for 'date'", async () => {
      const stickerData = {
        date: '2000-01-01',
        healthyHabit: HealthyHabitEnum.Cardio,
      };

      const res = await testServer.executeOperation(
        { query: REMOVE_STICKER, variables: { stickerData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'RESOURCE_NOT_FOUND',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        'A day event with this date does not exist for the current user',
      );
    });

    it("should return an error if 'healthyHabit' does not exist on day event", async () => {
      await seedDayEvent({
        user: user._id,
        date: new Date('2000-01-01T00:00:00Z'),
        healthyHabits: [HealthyHabitEnum.Cardio],
      });

      const stickerData = {
        date: '2000-01-01',
        healthyHabit: HealthyHabitEnum.Meditation,
      };

      const res = await testServer.executeOperation(
        { query: REMOVE_STICKER, variables: { stickerData } },
        { contextValue: { currentUser: { sub: user._id.toString() } } },
      );

      assert(res.body.kind === 'single');
      expect(res.body.singleResult.errors).toBeDefined();
      expect(res.body.singleResult.errors![0].extensions!.code).toBe(
        'BAD_USER_INPUT',
      );
      expect(res.body.singleResult.errors![0].message).toBe(
        `${stickerData.healthyHabit} does not appear in the list of HealthyHabits for this day`,
      );
    });
  });
});
