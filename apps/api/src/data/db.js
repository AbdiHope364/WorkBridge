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

let dbInstance;

export const getDB = () => dbInstance;

export const initDB = async () => {
  dbInstance = await connectDB();

  const users = dbInstance.collection('users');
  const userCount = await users.countDocuments();

  // If database is fresh/empty, automatically seed with structured mockups
  if (userCount === 0) {
    console.log('[Database] Empty database detected. Seeding initial mockup datasets...');

    await users.insertMany(mockUsers);
    await dbInstance.collection('profiles').insertMany(mockProfiles);
    await dbInstance.collection('jobs').insertMany(mockJobs);
    await dbInstance.collection('messages').insertMany(mockMessages);
    await dbInstance.collection('payments').insertMany(mockPayments);
    await dbInstance.collection('notifications').insertMany(mockNotifications);
    await dbInstance.collection('faqs').insertMany(mockFaqs);
    await dbInstance.collection('reports').insertMany(mockReports);
    await dbInstance.collection('disputes').insertMany(mockDisputes);
    await dbInstance.collection('bookings').insertMany(mockBookings);

    console.log('[Database] Mockup datasets successfully initialized.');
  }

  return dbInstance;
};

export const collections = {
  get users() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('users');
  },
  get jobs() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('jobs');
  },
  get messages() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('messages');
  },
  get payments() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('payments');
  },
  get tickets() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('tickets');
  },
  get faqs() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('faqs');
  },
  get reports() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('reports');
  },
  get disputes() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('disputes');
  },
  get notifications() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('notifications');
  },
  get profiles() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('profiles');
  },
  get bookings() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('bookings');
  },
  get subscriptions() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('subscriptions');
  },
  get subscriptionPlans() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('subscription_plans');
  },
  get reviews() {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance.collection('reviews');
  },
};
