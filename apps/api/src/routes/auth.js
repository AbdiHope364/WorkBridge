import express from 'express';
import {
  login,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  verifyEmail,
  getMe,
  googleLogin,
  googleCallback,
  googleCredentialAuth,
  logout,
  resendVerification,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);
router.post('/google/credential', googleCredentialAuth);
router.get('/google/failure', (req, res) => {
  res.redirect('/login?error=Google authentication failed');
});
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.get('/me', protect, getMe);

export default router;
