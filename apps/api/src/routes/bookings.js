import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController.js';

const router = express.Router();

// All booking endpoints require authentication
router.use(authenticateToken);

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);

export default router;

