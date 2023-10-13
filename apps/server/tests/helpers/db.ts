import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

// Start in-memory database and connect with mongoose
export const setUpDb = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB test database');
  } catch {
    console.log('Error connecting to MongoDB test database');
  }
};

// Close mongoose connection and stop in-memory database
export const closeDb = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

// Clear database after each test
export const clearDb = async () => {
  const { collections } = mongoose.connection;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
