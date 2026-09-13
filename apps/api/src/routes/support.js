import express from 'express';
import { protect } from '../middleware/auth.js';
import { getTickets, createTicket } from '../controllers/supportController.js';

const router = express.Router();

router.use(protect);
router.get('/', getTickets);
router.post('/', createTicket);

export default router;
