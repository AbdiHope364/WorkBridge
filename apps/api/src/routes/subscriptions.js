import express from 'express';
import {
  getSubscriptionPlans,
  getCurrentSubscription,
  getUserQuotas,
  mockCheckout,
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/plans', getSubscriptionPlans);
router.get('/current', protect, getCurrentSubscription);
router.get('/quotas', protect, getUserQuotas);
router.post('/mock-checkout', protect, mockCheckout);

export default router;

