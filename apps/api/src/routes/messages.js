import express from 'express';
import { protect } from '../middleware/auth.js';
import { getConversations, getConversationById, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.use(protect);
router.get('/', getConversations);
router.get('/:conversationId', getConversationById);
router.post('/:conversationId', sendMessage);

export default router;
