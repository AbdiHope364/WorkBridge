import { MongoClient } from 'mongodb';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/workbridge';
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });

  try {
    await client.connect();
    console.log('[MongoDB] Connected successfully to database');
    return client.db();
  } catch (error) {
    console.error('\n============================================================');
    console.error('[MongoDB Error] Could not connect to database.');
    console.error('Error Details:', error.message || error);
    if (String(error).includes('SSL alert number 80') || String(error).includes('tlsv1 alert internal error')) {
      console.error('\n>>> ATLAS IP WHITELIST REQUIRED:');
      console.error('MongoDB Atlas returned SSL Alert 80 because your current IP address is not whitelisted.');
      console.error('To fix:');
      console.error('1. Go to https://cloud.mongodb.com -> Login');
      console.error('2. Navigate to "Network Access" under Security (left sidebar)');
      console.error('3. Click "Add IP Address" -> Select "Allow Access from Anywhere" (0.0.0.0/0) or "Add Current IP"');
      console.error('4. Click "Confirm" and wait ~1 minute before restarting.');
    }
    console.error('============================================================\n');
    process.exit(1);
  }
};

