import { collections } from '../data/db.js';

export const getPayments = async (req, res) => {
  const userId = req.query.userId || req.user.id;
  const userPayments = await collections.payments.find({
    $or: [{ userId }, { clientId: userId }, { workerId: userId }],
  }).toArray();

  res.json({
    payments: userPayments,
    data: { payments: userPayments },
  });
};

export const getPaymentHistory = async (req, res) => {
  const userId = req.query.userId || req.user.id;
  const userPayments = await collections.payments.find({
    $or: [{ userId }, { clientId: userId }, { workerId: userId }],
  }).toArray();

  res.json({
    payments: userPayments,
    data: { payments: userPayments },
  });
};

export const createDeposit = async (req, res) => {
  const { amount, method = 'Telebirr', currency = 'ETB', description } = req.body;
  const numAmount = Number(amount || 0);

  if (numAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero.' });
  }

  const payment = {
    id: `pay_${Date.now()}`,
    userId: req.user.id,
    clientId: req.user.id,
    type: 'Deposit',
    method,
    amount: numAmount,
    currency,
    status: 'completed',
    description: description || `Wallet Deposit via ${method}`,
    createdAt: new Date().toISOString(),
  };

  await collections.payments.insertOne(payment);

  // Send a confirmation notification
  await collections.notifications.insertOne({
    id: `notif_${Date.now()}`,
    userId: req.user.id,
    type: 'payment_received',
    title: 'Deposit Successful',
    message: `Your deposit of ${numAmount} ${currency} via ${method} has been processed successfully.`,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  res.status(201).json({ payment, message: 'Deposit successful' });
};

export const releaseEscrow = async (req, res) => {
  const { bookingId, workerId, amount, currency = 'ETB' } = req.body;

  const numAmount = Number(amount || 0);
  const payment = {
    id: `escrow_${Date.now()}`,
    userId: req.user.id,
    clientId: req.user.id,
    workerId,
    bookingId,
    type: 'Escrow Release',
    method: 'Chapa Escrow',
    amount: numAmount,
    currency,
    status: 'completed',
    description: `Escrow payment released for booking #${bookingId}`,
    createdAt: new Date().toISOString(),
  };

  await collections.payments.insertOne(payment);

  if (bookingId) {
    await collections.bookings.updateOne(
      { id: bookingId },
      { $set: { paymentStatus: 'RELEASED', status: 'COMPLETED', updatedAt: new Date().toISOString() } }
    );
  }

  if (workerId) {
    await collections.notifications.insertOne({
      id: `notif_${Date.now()}`,
      userId: workerId,
      type: 'payment_received',
      title: 'Payment Released!',
      message: `The client has released ${numAmount} ${currency} for your completed trade service.`,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  }

  res.json({ payment, message: 'Escrow payment released successfully to the worker.' });
};

export const createCharge = async (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero.' });
  }

  const payment = {
    id: `pay_chg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    userId: req.user.id,
    type: 'Charge',
    amount,
    currency: req.body.currency || 'ETB',
    status: 'completed',
    description: req.body.description || 'Service Charge',
    createdAt: new Date().toISOString(),
  };

  await collections.payments.insertOne(payment);
  res.status(201).json({ payment });
};

export const getSubscriptions = async (req, res) => {
  const subscriptions = await collections.payments.find({
    userId: req.user.id,
    type: 'Subscription',
  }).toArray();
  res.json({ subscriptions });
};

export const createSubscription = async (req, res) => {
  const { planName = 'Pro Plan', amount = 1200, currency = 'ETB', method = 'Telebirr' } = req.body;
  const payment = {
    id: `sub_${Date.now()}`,
    userId: req.user.id,
    type: 'Subscription',
    planName,
    method,
    amount: Number(amount),
    currency,
    status: 'completed',
    description: `${planName} Subscription (${method})`,
    createdAt: new Date().toISOString(),
  };

  await collections.payments.insertOne(payment);
  res.status(201).json({ subscription: payment });
};

export const createChapaCheckout = async (req, res) => {
  const { applicationId, amount = 1500, currency = 'ETB', title = 'Trade Service Payment' } = req.body;

  const checkout = {
    id: `chapa_${Date.now()}`,
    applicationId,
    userId: req.user.id,
    amount: Number(amount),
    currency,
    status: 'pending',
    title,
    checkoutUrl: `https://checkout.chapa.co/checkout/web/${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(checkout);
};
