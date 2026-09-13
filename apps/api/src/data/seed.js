import 'dotenv/config';
import { connectDB } from '../config/db.js';
import {
  mockUsers,
  mockProfiles,
  mockJobs,
  mockMessages,
  mockPayments,
  mockNotifications,
  mockFaqs,
  mockReports,
  mockDisputes,
  mockBookings,
} from './mocks/index.js';

export const seedDatabase = async (forceReset = false) => {
  const db = await connectDB();
  console.log(`[Seed] Connected to database: "${db.databaseName}"`);

  const seedCollection = async (collectionName, data, keyField = 'id') => {
    const col = db.collection(collectionName);

    if (forceReset) {
      await col.deleteMany({});
      console.log(`[Seed] Cleared collection "${collectionName}"`);
    }

    if (data.length > 0) {
      const operations = data.map((item) => ({
        updateOne: {
          filter: { [keyField]: item[keyField] },
          update: { $set: item },
          upsert: true,
        },
      }));
      await col.bulkWrite(operations);
    }

    const totalCount = await col.countDocuments();
    console.log(`[Seed] Collection "${collectionName}": ${totalCount} total documents.`);
  };

  await seedCollection('users', mockUsers, 'email');
  await seedCollection('profiles', mockProfiles, 'id');
  await seedCollection('jobs', mockJobs, 'id');
  await seedCollection('messages', mockMessages, 'conversationId');
  await seedCollection('payments', mockPayments, 'id');
  await seedCollection('notifications', mockNotifications, 'id');
  await seedCollection('faqs', mockFaqs, 'id');
  await seedCollection('reports', mockReports, 'id');
  await seedCollection('disputes', mockDisputes, 'id');
  await seedCollection('bookings', mockBookings, 'id');

  console.log('[Seed] Database seeding completed successfully!');
  return db;
};

// If run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  const force = process.argv.includes('--force') || process.argv.includes('-f');
  seedDatabase(force)
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
