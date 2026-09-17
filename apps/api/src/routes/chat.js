import express from 'express';
import { protect } from '../middleware/auth.js';
import { collections } from '../data/db.js';
import { mockMessages } from '../data/mocks/messages.mock.js';

const router = express.Router();

router.use(protect);

router.get('/conversations', async (req, res) => {
  try {
    const conversations = await collections.messages.find({
      participants: { $in: [req.user.id] },
    }).toArray();

    res.json(conversations || []);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch conversations' });
  }
});

router.post('/conversations', async (req, res) => {
  try {
    const { participantId } = req.body;
    const newConv = {
      conversationId: `c_${Date.now()}`,
      participants: [req.user.id, participantId || 'u_employer_default'],
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    await collections.messages.insertOne(newConv);
    res.status(201).json(newConv);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create conversation' });
  }
});

router.get('/conversations/:conversationId/messages', async (req, res) => {
  try {
    let conversation = await collections.messages.findOne({
      conversationId: req.params.conversationId,
    });

    if (!conversation) {
      const mock = mockMessages.find(m => m.conversationId === req.params.conversationId);
      if (mock) {
        return res.json(mock.messages || []);
      }
      return res.json([]);
    }

    res.json(conversation.messages || []);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch messages' });
  }
});

router.post('/conversations/:conversationId/messages', async (req, res) => {
  try {
    const text = req.body.text || req.body.body || req.body.content || req.body.message || '';
    let conversation = await collections.messages.findOne({
      conversationId: req.params.conversationId,
    });

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId: req.user.id,
      text,
      createdAt: new Date().toISOString(),
      read: true,
    };

    if (!conversation) {
      conversation = {
        conversationId: req.params.conversationId,
        participants: [req.user.id, 'u_employer_default'],
        updatedAt: new Date().toISOString(),
        messages: [newMessage],
      };
      await collections.messages.insertOne(conversation);
    } else {
      await collections.messages.updateOne(
        { conversationId: req.params.conversationId },
        {
          $push: { messages: newMessage },
          $set: { updatedAt: new Date().toISOString() },
        }
      );
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to send message' });
  }
});

export default router;
