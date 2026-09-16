import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  shortlistCandidate,
  getEmployerJobs,
  getEmployerDashboard,
  getJobseekerDashboard,
  getApplications,
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Static & collection endpoints (must be defined BEFORE parameterized /:id)
router.get('/', getJobs);
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.get('/employer/dashboard', protect, authorize('employer', 'admin'), getEmployerDashboard);
router.get('/jobseeker/dashboard', protect, authorize('worker', 'jobseeker', 'admin'), getJobseekerDashboard);
router.get('/employer', protect, authorize('employer', 'admin'), getEmployerJobs);
router.get('/applications', protect, authorize('employer', 'admin'), getApplications);
router.post('/applications', protect, authorize('worker', 'jobseeker', 'admin'), applyJob);

// Parameterized job endpoints
router.get('/:id', getJobById);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);
router.post('/:id/apply', protect, authorize('worker', 'jobseeker', 'admin'), applyJob);
router.post('/:id/shortlist', protect, authorize('employer', 'admin'), shortlistCandidate);

export default router;
