import express from 'express';
import { protect } from '../middleware/auth.js';
import { collections } from '../data/db.js';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const { category, type, priority, isRead, isSeen, page = 1, limit = 20 } = req.query;

  const query = { userId: req.user.id };
  if (category) query.category = category;
  if (type) query.type = type;
  if (priority) query.priority = priority;
  if (isRead !== undefined) query.isRead = isRead === 'true';
  if (isSeen !== undefined) query.isSeen = isSeen === 'true';

  const skip = (Number(page) - 1) * Number(limit);
  const notifications = await collections.notifications.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  const total = await collections.notifications.countDocuments(query);

  res.json({
    notifications,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

router.get('/:id', async (req, res) => {
  const notification = await collections.notifications.findOne({
    id: req.params.id,
    userId: req.user.id,
  });

  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  res.json(notification);
});

router.get('/meta/badges', async (req, res) => {
  const unreadCount = await collections.notifications.countDocuments({
    userId: req.user.id,
    isRead: false,
  });
  const unseenCount = await collections.notifications.countDocuments({
    userId: req.user.id,
    isSeen: false,
  });

  res.json({ unread: unreadCount, unseen: unseenCount });
});

router.patch('/mark-seen', async (req, res) => {
  await collections.notifications.updateMany(
    { userId: req.user.id, isSeen: false },
    { $set: { isSeen: true } }
  );
  res.json({ message: 'Notifications marked as seen' });
});

router.patch('/mark-all-read', async (req, res) => {
  await collections.notifications.updateMany(
    { userId: req.user.id, isRead: false },
    { $set: { isRead: true } }
  );
  res.json({ message: 'All notifications marked as read' });
});

router.patch('/:id/read', async (req, res) => {
  await collections.notifications.updateOne(
    { id: req.params.id, userId: req.user.id },
    { $set: { isRead: true } }
  );
  res.json({ message: 'Notification marked as read' });
});

router.patch('/:id', async (req, res) => {
  await collections.notifications.deleteOne({
    id: req.params.id,
    userId: req.user.id,
  });
  res.json({ message: 'Notification deleted' });
});

router.patch('/all', async (req, res) => {
  await collections.notifications.deleteMany({ userId: req.user.id });
  res.json({ message: 'All notifications cleared' });
});

export default router;
