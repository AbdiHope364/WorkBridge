import { MongoClient } from 'mongodb';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/workbridge';
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
