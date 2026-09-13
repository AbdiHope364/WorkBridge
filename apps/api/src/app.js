import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import jobsRoutes from './routes/jobs.js';
import usersRoutes from './routes/users.js';
import messagesRoutes from './routes/messages.js';
import chatRoutes from './routes/chat.js';
import paymentsRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';
import landingRoutes from './routes/landing.js';
import supportRoutes from './routes/support.js';
import notificationsRoutes from './routes/notifications.js';
import accountsRoutes from './routes/accounts.js';
import bookingsRoutes from './routes/bookings.js';
import subscriptionsRoutes from './routes/subscriptions.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WorkBridge API is healthy' });
});

app.use(errorHandler);

export default app;
