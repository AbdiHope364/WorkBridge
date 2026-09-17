import { collections } from '../data/db.js';
import { mockMessages } from '../data/mocks/messages.mock.js';

export const getConversations = async (req, res) => {
  try {
    const conversations = await collections.messages.find({
      participants: { $in: [req.user.id] },
    }).toArray();

    res.json({ conversations: conversations || [] });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch conversations' });
  }
};

export const getConversationById = async (req, res) => {
  try {
    let conversation = await collections.messages.findOne({
      conversationId: req.params.conversationId,
    });

    if (!conversation) {
      const mock = mockMessages.find(m => m.conversationId === req.params.conversationId);
      if (mock) {
        return res.json({ conversation: mock });
      }
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json({ conversation });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch conversation' });
  }
};

export const sendMessage = async (req, res) => {
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

    const updated = await collections.messages.findOne({ conversationId: req.params.conversationId });
    res.status(201).json({ message: newMessage, conversation: updated });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to send message' });
  }
};
