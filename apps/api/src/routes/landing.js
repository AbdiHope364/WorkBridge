import express from 'express';
import { getJobsPreview, getWorkersPreview, getFaqs, submitContact } from '../controllers/landingController.js';

const router = express.Router();

router.get('/jobs', getJobsPreview);
router.get('/workers', getWorkersPreview);
router.get('/faq', getFaqs);
router.post('/contact', submitContact);

export default router;
