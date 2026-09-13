import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getPayments,
  getPaymentHistory,
  createDeposit,
  releaseEscrow,
  createCharge,
  getSubscriptions,
  createSubscription,
  createChapaCheckout,
} from '../controllers/paymentController.js';

const router = express.Router();

router.use(protect);
router.get('/', getPayments);
router.get('/history', getPaymentHistory);
router.post('/deposit', createDeposit);
router.post('/escrow/release', releaseEscrow);
router.post('/charge', createCharge);
router.get('/subscriptions', getSubscriptions);
router.post('/subscriptions', createSubscription);
router.post('/chapa/checkout', createChapaCheckout);

export default router;
