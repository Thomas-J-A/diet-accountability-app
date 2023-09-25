import mongoose from 'mongoose';
import env from './env';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI);
    console.log(`Connected to MongoDB at ${connection.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        `An error occured while connecting to MongoDB: ${err.message}`,
      );
    } else {
      console.error('An unknown error occurred while connecting to MongoDB');
    }

    process.exit(1);
  }
};

export default connectDB;
