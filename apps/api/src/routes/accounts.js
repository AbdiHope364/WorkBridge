import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { collections } from '../data/db.js';

const router = express.Router();

router.use(protect);

// Jobseeker profiles
router.get('/jobseekers/me', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'jobseeker' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json({ success: true, data: profile, pagination: null });
});

router.post('/jobseekers', async (req, res) => {
  const profile = {
    id: `p${Date.now()}`,
    userId: req.user.id,
    type: 'jobseeker',
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await collections.profiles.insertOne(profile);
  res.status(201).json({ success: true, data: profile, pagination: null });
});

router.patch('/jobseekers/me', async (req, res) => {
  const update = { ...req.body, updatedAt: new Date().toISOString() };
  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'jobseeker' },
    { $set: update }
  );
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'jobseeker' });
  res.json({ success: true, data: profile, pagination: null });
});

router.post('/jobseekers/upload-avatar', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'jobseeker' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const avatarUrl = req.body?.avatarUrl || req.body?.avatar?.url || req.body?.avatar || req.body?.url || (typeof req.body === 'string' && req.body.startsWith('data:image') ? req.body : null);
  const avatarObj = {
    url: avatarUrl || profile.avatar?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    publicId: req.body?.publicId || profile.avatar?.publicId || `avatar_${Date.now()}`
  };

  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'jobseeker' },
    { $set: { avatar: avatarObj, updatedAt: new Date().toISOString() } }
  );

  await collections.users.updateOne(
    { id: req.user.id },
    { $set: { avatarUrl: avatarObj.url, avatar: avatarObj.url, updatedAt: new Date().toISOString() } }
  );

  const updated = await collections.profiles.findOne({ userId: req.user.id, type: 'jobseeker' });
  res.json({ success: true, data: updated, pagination: null });
});

// Employer - Company profiles
router.get('/employer/me', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json({ success: true, data: profile, pagination: null });
});

router.post('/employer/companies', async (req, res) => {
  const profile = {
    id: `p${Date.now()}`,
    userId: req.user.id,
    type: 'employer-company',
    employerType: 'COMPANY_EMPLOYER',
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await collections.profiles.insertOne(profile);
  res.status(201).json({ success: true, data: profile, pagination: null });
});

router.patch('/employer/companies/me', async (req, res) => {
  const update = { ...req.body, updatedAt: new Date().toISOString() };
  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'employer-company' },
    { $set: update }
  );
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  res.json({ success: true, data: profile, pagination: null });
});

router.post('/employer/companies/upload-logo', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const logoUrl = req.body?.logoUrl || req.body?.url || req.body?.companyLogoUrl?.url || (typeof req.body === 'string' && req.body.startsWith('data:image') ? req.body : null);
  const logoObj = {
    url: logoUrl || profile.companyLogoUrl?.url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    publicId: req.body?.publicId || profile.companyLogoUrl?.publicId || `logo_${Date.now()}`
  };

  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'employer-company' },
    { $set: { companyLogoUrl: logoObj, updatedAt: new Date().toISOString() } }
  );

  const updated = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  res.json({ success: true, data: updated, pagination: null });
});

router.post('/employer/companies/upload-banner', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const bannerUrl = req.body?.bannerUrl || req.body?.url || req.body?.bannerImageUrl?.url || (typeof req.body === 'string' && req.body.startsWith('data:image') ? req.body : null);
  const bannerObj = {
    url: bannerUrl || profile.bannerImageUrl?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    publicId: req.body?.publicId || profile.bannerImageUrl?.publicId || `banner_${Date.now()}`
  };

  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'employer-company' },
    { $set: { bannerImageUrl: bannerObj, updatedAt: new Date().toISOString() } }
  );

  const updated = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-company' });
  res.json({ success: true, data: updated, pagination: null });
});

// Employer - Individual profiles
router.post('/employer/individuals', async (req, res) => {
  const profile = {
    id: `p${Date.now()}`,
    userId: req.user.id,
    type: 'employer-individual',
    employerType: 'INDIVIDUAL_EMPLOYER',
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await collections.profiles.insertOne(profile);
  res.status(201).json({ success: true, data: profile, pagination: null });
});

router.patch('/employer/individuals/me', async (req, res) => {
  const update = { ...req.body, updatedAt: new Date().toISOString() };
  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'employer-individual' },
    { $set: update }
  );
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-individual' });
  res.json({ success: true, data: profile, pagination: null });
});

router.post('/employer/individuals/upload-avatar', async (req, res) => {
  const profile = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-individual' });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const avatarUrl = req.body?.avatarUrl || req.body?.avatar?.url || req.body?.avatar || req.body?.url || (typeof req.body === 'string' && req.body.startsWith('data:image') ? req.body : null);
  const avatarObj = {
    url: avatarUrl || profile.avatar?.url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    publicId: req.body?.publicId || profile.avatar?.publicId || `avatar_${Date.now()}`
  };

  await collections.profiles.updateOne(
    { userId: req.user.id, type: 'employer-individual' },
    { $set: { avatar: avatarObj, updatedAt: new Date().toISOString() } }
  );

  await collections.users.updateOne(
    { id: req.user.id },
    { $set: { avatarUrl: avatarObj.url, avatar: avatarObj.url, updatedAt: new Date().toISOString() } }
  );

  const updated = await collections.profiles.findOne({ userId: req.user.id, type: 'employer-individual' });
  res.json({ success: true, data: updated, pagination: null });
});

export default router;
