import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAdminUsers,
  getAdminJobs,
  getReports,
  getDisputes,
  verifyUser,
  verifyCompany,
  resolveDispute,
  getVerifications,
  approveVerification,
  getDashboardStats,
  getDashboardOverview,
  getDashboardJobStatus,
  getDashboardCategories,
  getDashboardVerifications,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/users', getAdminUsers);
router.get('/jobs', getAdminJobs);
router.get('/reports', getReports);
router.get('/disputes', getDisputes);
router.put('/users/:id/verify', verifyUser);
router.put('/companies/:id/verify', verifyCompany);
router.patch('/disputes/:id', resolveDispute);
router.get('/verifications', getVerifications);
router.post('/verifications/:id/approve', approveVerification);
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/overview', getDashboardOverview);
router.get('/dashboard/job-status', getDashboardJobStatus);
router.get('/dashboard/categories', getDashboardCategories);
router.get('/dashboard/verifications', getDashboardVerifications);

export default router;
