import { collections } from '../data/db.js';

export const getConversations = async (req, res) => {
  const conversations = await collections.messages.find({
    participants: { $in: [req.user.id] },
  }).toArray();
  res.json({ conversations });
};

export const getConversationById = async (req, res) => {
  const conversation = await collections.messages.findOne({
    conversationId: req.params.conversationId,
    participants: { $in: [req.user.id] },
  });

  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json({ conversation });
};

export const sendMessage = async (req, res) => {
  const conversation = await collections.messages.findOne({
    conversationId: req.params.conversationId,
    participants: { $in: [req.user.id] },
  });

  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  const newMessage = {
    id: `m${conversation.messages.length + 1}`,
    senderId: req.user.id,
    text: req.body.text,
    createdAt: new Date().toISOString(),
  };

  await collections.messages.updateOne(
    { conversationId: req.params.conversationId },
    { $push: { messages: newMessage } }
  );

  const updated = await collections.messages.findOne({ conversationId: req.params.conversationId });
  res.status(201).json({ message: newMessage, conversation: updated });
};
