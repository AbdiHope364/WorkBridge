import express from 'express';
import { protect } from '../middleware/auth.js';
import { collections } from '../data/db.js';

const router = express.Router();

router.use(protect);

router.get('/conversations', async (req, res) => {
  const conversations = await collections.messages.find({
    participants: { $in: [req.user.id] },
  }).toArray();
  res.json(conversations);
});

router.get('/conversations/:conversationId/messages', async (req, res) => {
  const conversation = await collections.messages.findOne({
    conversationId: req.params.conversationId,
    participants: { $in: [req.user.id] },
  });

  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json(conversation.messages || []);
});

router.post('/conversations/:conversationId/messages', async (req, res) => {
  const conversation = await collections.messages.findOne({
    conversationId: req.params.conversationId,
    participants: { $in: [req.user.id] },
  });

  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  const newMessage = {
    id: `m${(conversation.messages?.length || 0) + 1}`,
    senderId: req.user.id,
    text: req.body.text,
    createdAt: new Date().toISOString(),
  };

  await collections.messages.updateOne(
    { conversationId: req.params.conversationId },
    { $push: { messages: newMessage } }
  );

  res.status(201).json(newMessage);
});

export default router;
