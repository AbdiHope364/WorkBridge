import { collections } from '../data/db.js';

const sanitizeUser = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

export const getUsers = async (req, res) => {
  try {
    const { role, q, trade } = req.query;
    const filter = {};

    if (role) {
      if (role === 'jobseeker' || role === 'worker') {
        filter.role = { $in: ['worker', 'jobseeker'] };
      } else {
        filter.role = role;
      }
    }

    if (trade) {
      filter.$or = [
        { 'profile.trade': { $regex: String(trade), $options: 'i' } },
        { 'profile.headline': { $regex: String(trade), $options: 'i' } },
        { 'profile.skills': { $regex: String(trade), $options: 'i' } },
      ];
    }

    if (q) {
      const regex = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { name: { $regex: regex } },
        { fullName: { $regex: regex } },
        { email: { $regex: regex } },
        { 'profile.trade': { $regex: regex } },
        { 'profile.headline': { $regex: regex } },
        { 'profile.skills': { $regex: regex } },
        { 'profile.location': { $regex: regex } },
      ];
    }

    const users = await collections.users.find(filter).toArray();
    res.json({
      users: users.map(sanitizeUser),
      data: { users: users.map(sanitizeUser) },
    });
  } catch (error) {
    console.error('getUsers error:', error);
    res.status(500).json({ error: 'Failed to fetch users from database' });
  }
};

export const getUserById = async (req, res) => {
  const user = await collections.users.findOne({ id: req.params.id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json({ user: sanitizeUser(user) });
};

export const updateUser = async (req, res) => {
  const user = await collections.users.findOne({ id: req.params.id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updated = await collections.users.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { returnDocument: 'after' }
  );

  const updatedUser = updated?.value !== undefined ? updated.value : updated;
  res.json({ user: sanitizeUser(updatedUser) });
};

export const getUserNotifications = async (req, res) => {
  const user = await collections.users.findOne({ id: req.params.id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json({ notifications: user.notifications || [] });
};
