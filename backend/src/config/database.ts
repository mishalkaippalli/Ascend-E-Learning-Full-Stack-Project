
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully'); // Later we replace this with Winston (Rule 16)
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};