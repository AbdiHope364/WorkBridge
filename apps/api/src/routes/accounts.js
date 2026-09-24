import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { collections } from '../data/db.js';

const router = express.Router();

router.use(protect);

// Jobseeker profiles
router.get('/jobseekers/me', async (req, res) => {
  let profile = await collections.profiles.findOne({ userId: req.user.id, type: 'jobseeker' });
  if (!profile) {
    const user = await collections.users.findOne({ id: req.user.id });
    if (user) {
      const nameParts = (user.fullName || user.name || '').trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      profile = {
        id: `p_${req.user.id}`,
        userId: req.user.id,
        authId: req.user.id,
        type: 'jobseeker',
        firstName,
        lastName,
        phone: user.phone || '',
        faydaFin: user.faydaFin || '',
        faydaStatus: user.faydaStatus || (user.faydaFin ? 'VERIFIED' : 'UNVERIFIED'),
        location: user.location || user.profile?.location || { city: '', addressLine1: '', addressLine2: '' },
        currentPosition: user.profile?.headline || user.profile?.trade || '',
        bio: user.profile?.bio || '',
        skills: user.profile?.skills || [],
        educations: [],
        experiences: [],
        socialLinks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await collections.profiles.insertOne(profile);
    } else {
      return res.status(404).json({ error: 'Profile not found' });
    }
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
    { 
      $set: update,
      $setOnInsert: {
        id: `p_${req.user.id}`,
        userId: req.user.id,
        authId: req.user.id,
        type: 'jobseeker',
        createdAt: new Date().toISOString(),
      }
    },
    { upsert: true }
  );

  // Synchronize relevant fields to user record
  const userUpdate = {};
  if (update.firstName || update.lastName || update.fullName) {
    const fn = (update.firstName || '').trim();
    const ln = (update.lastName || '').trim();
    const full = update.fullName || `${fn} ${ln}`.trim();
    if (full) {
      userUpdate.fullName = full;
      userUpdate.name = full;
    }
  }
  if (update.phone) userUpdate.phone = update.phone;
  if (update.faydaFin !== undefined) userUpdate.faydaFin = update.faydaFin;
  if (update.faydaStatus !== undefined) {
    userUpdate.faydaStatus = update.faydaStatus;
    if (update.faydaStatus === 'VERIFIED') {
      userUpdate.verified = true;
    }
  }
  if (update.headline || update.currentPosition) {
    const hl = update.headline || update.currentPosition;
    userUpdate['profile.headline'] = hl;
    userUpdate['profile.trade'] = hl;
  }
  if (update.bio) userUpdate['profile.bio'] = update.bio;
  if (update.skills) userUpdate['profile.skills'] = update.skills;
  if (update.location) {
    userUpdate['profile.location'] = typeof update.location === 'object'
      ? `${update.location.city || ''} ${update.location.addressLine1 || ''}`.trim()
      : update.location;
  }
  if (update.hourlyRate !== undefined) {
    userUpdate['profile.hourlyRate'] = update.hourlyRate;
  }

  if (Object.keys(userUpdate).length > 0) {
    userUpdate.updatedAt = new Date().toISOString();
    await collections.users.updateOne({ id: req.user.id }, { $set: userUpdate });
  }

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
  let profile = await collections.profiles.findOne({
    userId: req.user.id,
    type: { $in: ['employer-company', 'employer-individual'] }
  });

  if (!profile) {
    const user = await collections.users.findOne({ id: req.user.id });
    if (user) {
      profile = {
        id: `p_${req.user.id}`,
        userId: req.user.id,
        authId: req.user.id,
        type: user.employerType === 'INDIVIDUAL_EMPLOYER' ? 'employer-individual' : 'employer-company',
        employerType: user.employerType === 'INDIVIDUAL_EMPLOYER' ? 'INDIVIDUAL_EMPLOYER' : 'COMPANY_EMPLOYER',
        companyName: user.companyName || user.fullName || user.name || '',
        fullName: user.fullName || user.name || '',
        phone: user.phone || '',
        faydaFin: user.faydaFin || '',
        faydaStatus: user.faydaStatus || (user.faydaFin ? 'VERIFIED' : 'UNVERIFIED'),
        canPostJobs: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await collections.profiles.insertOne(profile);
    } else {
      return res.status(404).json({ error: 'Profile not found' });
    }
  }

  if (profile && profile.canPostJobs === undefined) {
    profile.canPostJobs = true;
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
    { 
      $set: update,
      $setOnInsert: {
        id: `p_${req.user.id}`,
        userId: req.user.id,
        authId: req.user.id,
        type: 'employer-company',
        employerType: 'COMPANY_EMPLOYER',
        createdAt: new Date().toISOString(),
      }
    },
    { upsert: true }
  );

  const userUpdate = {};
  if (update.companyName) userUpdate.companyName = update.companyName;
  if (update.fullName) userUpdate.fullName = update.fullName;
  if (update.phone) userUpdate.phone = update.phone;
  if (update.faydaFin !== undefined) userUpdate.faydaFin = update.faydaFin;
  if (update.faydaStatus !== undefined) {
    userUpdate.faydaStatus = update.faydaStatus;
    if (update.faydaStatus === 'VERIFIED') userUpdate.verified = true;
  }
  if (Object.keys(userUpdate).length > 0) {
    userUpdate.updatedAt = new Date().toISOString();
    await collections.users.updateOne({ id: req.user.id }, { $set: userUpdate });
  }

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
    { 
      $set: update,
      $setOnInsert: {
        id: `p_${req.user.id}`,
        userId: req.user.id,
        authId: req.user.id,
        type: 'employer-individual',
        employerType: 'INDIVIDUAL_EMPLOYER',
        createdAt: new Date().toISOString(),
      }
    },
    { upsert: true }
  );

  const userUpdate = {};
  if (update.fullName) userUpdate.fullName = update.fullName;
  if (update.phone) userUpdate.phone = update.phone;
  if (update.faydaFin !== undefined) userUpdate.faydaFin = update.faydaFin;
  if (update.faydaStatus !== undefined) {
    userUpdate.faydaStatus = update.faydaStatus;
    if (update.faydaStatus === 'VERIFIED') userUpdate.verified = true;
  }
  if (Object.keys(userUpdate).length > 0) {
    userUpdate.updatedAt = new Date().toISOString();
    await collections.users.updateOne({ id: req.user.id }, { $set: userUpdate });
  }

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
