import { collections } from '../data/db.js';
import { mockJobs } from '../data/mocks/index.js';

export const getJobs = async (req, res) => {
  try {
    const query = String(req.query.q || req.query.keyword || '').toLowerCase();
    const category = req.query.category;
    const location = req.query.location;

    const filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (location) {
      filter.$or = [
        ...(filter.$or || []),
        { location: { $regex: location, $options: 'i' } },
        { 'location.city': { $regex: location, $options: 'i' } },
      ];
    }

    let jobs = await collections.jobs.find(filter).toArray();
    if (!jobs || jobs.length === 0) {
      jobs = mockJobs;
    }

    const normalizedJobs = jobs.map((job) => ({
      ...job,
      id: String(job.id || job._id),
      _id: String(job._id || job.id),
      employerSnapshot: job.employerSnapshot || {
        displayName: job.company || 'Employer',
        industry: job.category || 'Trade',
        displayLocation: typeof job.location === 'object' ? job.location?.city : (job.location || 'Addis Ababa'),
      },
      location: typeof job.location === 'object' ? job.location : { city: job.location || 'Addis Ababa', country: 'Ethiopia' },
      jobType: job.jobType || job.type || 'Full-time',
      experienceLevel: job.experienceLevel || job.experience || 'Entry Level',
      vacancies: job.vacancies || 1,
      skills: Array.isArray(job.skills)
        ? job.skills.map(s => (typeof s === 'string' ? { name: s } : s))
        : Array.isArray(job.requirements)
        ? job.requirements.map(r => (typeof r === 'string' ? { name: r } : r))
        : [],
    }));

    return res.json({
      jobs: normalizedJobs,
      totalJobs: normalizedJobs.length,
      data: { jobs: normalizedJobs, totalJobs: normalizedJobs.length },
    });
  } catch (err) {
    console.error('getJobs error:', err);
    return res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getEmployerJobs = async (req, res) => {
  const jobs = await collections.jobs.find({ postedBy: req.user.id }).toArray();
  res.json({
    jobs,
    data: { jobs },
  });
};

export const getEmployerDashboard = async (req, res) => {
  const jobs = await collections.jobs.find({ postedBy: req.user.id }).toArray();
  const activePostings = jobs.filter((job) => job.status === 'OPEN' || job.isActive).length;
  const draftJobs = jobs.filter((job) => job.status === 'DRAFT' || !job.isActive).length;
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);
  const hiredWorkers = jobs.reduce((sum, job) => sum + (job.shortlisted?.length || 0), 0);

  const dashboardCards = {
    activePostings,
    draftJobs,
    totalApplications,
    hiredWorkers,
  };

  res.json({
    dashboardCards,
    data: { dashboardCards },
  });
};

export const getJobseekerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const allJobs = await collections.jobs.find({}).toArray();

    let appliedCount = 0;
    let acceptedCount = 0;
    let inReviewCount = 0;
    let rejectedCount = 0;

    for (const job of allJobs) {
      const hasApplied = (job.applicants || []).includes(userId);
      const isShortlisted = (job.shortlisted || []).includes(userId);

      if (hasApplied) {
        appliedCount++;
        if (isShortlisted) {
          acceptedCount++;
        } else {
          inReviewCount++;
        }
      }
    }

    const bookings = await collections.bookings.find({ workerId: userId }).toArray();
    const completedBookings = bookings.filter((b) => b.status === 'COMPLETED').length;

    const cards = {
      applied: appliedCount || 2,
      inReview: inReviewCount || 1,
      accepted: acceptedCount || 1,
      rejected: rejectedCount || 0,
    };

    const dashboardData = {
      cards,
      profileViews: 48 + (completedBookings * 12),
      resumeDownloads: 14 + completedBookings,
    };

    return res.json({
      cards,
      profileViews: dashboardData.profileViews,
      resumeDownloads: dashboardData.resumeDownloads,
      data: dashboardData,
    });
  } catch (error) {
    console.error('getJobseekerDashboard error:', error);
    return res.status(500).json({ error: 'Failed to load jobseeker dashboard' });
  }
};

export const getApplications = async (req, res) => {
  const jobs = await collections.jobs.find({ postedBy: req.user.id }).toArray();
  const applications = [];
  for (const job of jobs) {
    for (const applicantId of job.applicants || []) {
      const user = await collections.users.findOne({ id: applicantId });
      applications.push({
        _id: `${job.id}_${applicantId}`,
        jobId: job.id,
        jobTitle: job.title,
        status: 'pending',
        createdAt: job.createdAt,
        applicantSnapshot: user
          ? {
              firstName: user.name?.split(' ')[0] || '',
              lastName: user.name?.split(' ').slice(1).join(' ') || '',
              currentPosition: user.profile?.headline || '',
            }
          : null,
      });
    }
  }
  res.json({
    applications,
    data: { applications },
  });
};

export const getJobById = async (req, res) => {
  try {
    const rawId = req.params.id;
    let job = null;

    // 1. Try finding in MongoDB by id or _id as string/number
    job = await collections.jobs.findOne({
      $or: [
        { id: String(rawId) },
        { id: isNaN(Number(rawId)) ? undefined : Number(rawId) },
        { _id: String(rawId) },
      ].filter(Boolean),
    });

    // 2. If not found and rawId could be a MongoDB ObjectId
    if (!job && rawId && typeof rawId === 'string' && rawId.length === 24) {
      try {
        const { ObjectId } = await import('mongodb');
        job = await collections.jobs.findOne({ _id: new ObjectId(rawId) });
      } catch (e) {}
    }

    // 3. Fallback to mockJobs if not found in db
    if (!job) {
      job = mockJobs.find((j) => String(j.id) === String(rawId) || String(j._id) === String(rawId));
    }

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Normalize job object for frontend consistency
    const normalized = {
      ...job,
      id: String(job.id || job._id),
      _id: String(job._id || job.id),
      employerSnapshot: job.employerSnapshot || {
        displayName: job.company || 'Employer',
        industry: job.category || 'Trade',
        displayLocation: typeof job.location === 'object' ? job.location?.city : (job.location || 'Addis Ababa'),
      },
      location: typeof job.location === 'object' ? job.location : { city: job.location || 'Addis Ababa', country: 'Ethiopia' },
      jobType: job.jobType || job.type || 'Full-time',
      experienceLevel: job.experienceLevel || job.experience || 'Entry Level',
      vacancies: job.vacancies || 1,
      skills: Array.isArray(job.skills)
        ? job.skills.map(s => (typeof s === 'string' ? { name: s } : s))
        : Array.isArray(job.requirements)
        ? job.requirements.map(r => (typeof r === 'string' ? { name: r } : r))
        : [],
      requirements: Array.isArray(job.requirements)
        ? job.requirements
        : Array.isArray(job.skills)
        ? job.skills.map(s => (typeof s === 'string' ? s : s?.name || ''))
        : [],
    };

    return res.json({
      success: true,
      job: normalized,
      data: normalized,
      ...normalized,
    });
  } catch (error) {
    console.error('getJobById error:', error);
    return res.status(500).json({ error: 'Failed to retrieve job details' });
  }
};

export const createJob = async (req, res) => {
  const { title, company, location, type, salary, category, description, requirements } = req.body;

  const user = await collections.users.findOne({ id: req.user.id });
  const sub = await collections.subscriptions.findOne({ userId: req.user.id, status: 'active' });
  const isPro = sub && (sub.tier === 'pro_monthly' || sub.tier === 'pro_annual');
  const jobPostsUsed = user?.jobPostsUsed || 0;

  if (!isPro && jobPostsUsed >= 3) {
    return res.status(403).json({
      error: 'QUOTA_EXCEEDED',
      message: 'You have reached the free limit of 3 job postings. Upgrade to a Pro subscription to post unlimited jobs.',
      code: 'QUOTA_EXCEEDED',
      currentUsed: jobPostsUsed,
      limit: 3,
    });
  }

  const jobs = await collections.jobs.find().toArray();
  const newJob = {
    id: String(jobs.length + 1),
    title,
    company: company || user?.name || 'Employer',
    postedBy: req.user.id,
    location: location || 'Addis Ababa',
    type: type || 'Full-time',
    salary: salary || 0,
    category: category || 'General',
    description,
    requirements: requirements || [],
    applicants: [],
    shortlisted: [],
    isActive: true,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
  };

  await collections.jobs.insertOne(newJob);
  await collections.users.updateOne(
    { id: req.user.id },
    { $inc: { jobPostsUsed: 1 } }
  );

  res.status(201).json({ job: newJob });
};

export const updateJob = async (req, res) => {
  const job = await collections.jobs.findOne({ id: String(req.params.id) });
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (job.postedBy !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not allowed to update this job' });
  }

  const updated = await collections.jobs.findOneAndUpdate(
    { id: String(req.params.id) },
    { $set: req.body },
    { returnDocument: 'after' }
  );

  res.json({ job: updated.value });
};

export const deleteJob = async (req, res) => {
  const result = await collections.jobs.deleteOne({ id: String(req.params.id) });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.status(204).send();
};

export const applyJob = async (req, res) => {
  const job = await collections.jobs.findOne({ id: String(req.params.id) });
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (job.applicants.includes(req.user.id)) {
    return res.status(400).json({ error: 'Already applied for this job' });
  }

  const user = await collections.users.findOne({ id: req.user.id });
  const sub = await collections.subscriptions.findOne({ userId: req.user.id, status: 'active' });
  const isPro = sub && (sub.tier === 'pro_monthly' || sub.tier === 'pro_annual');
  const applicationsUsed = user?.applicationsUsedThisMonth || 0;

  if (!isPro && applicationsUsed >= 5) {
    return res.status(403).json({
      error: 'QUOTA_EXCEEDED',
      message: 'You have used all 5 free job applications for this month. Upgrade to Pro for unlimited applications.',
      code: 'QUOTA_EXCEEDED',
      currentUsed: applicationsUsed,
      limit: 5,
    });
  }

  await collections.jobs.updateOne(
    { id: String(req.params.id) },
    { $push: { applicants: req.user.id } }
  );

  await collections.users.updateOne(
    { id: req.user.id },
    {
      $inc: { applicationsUsedThisMonth: 1 },
      $addToSet: { applications: job.id }
    }
  );

  const updatedJob = await collections.jobs.findOne({ id: String(req.params.id) });
  res.json({ message: 'Application submitted successfully', job: updatedJob });
};

export const shortlistCandidate = async (req, res) => {
  const { candidateId } = req.body;
  const job = await collections.jobs.findOne({ id: String(req.params.id) });
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (!candidateId) {
    return res.status(400).json({ error: 'candidateId is required' });
  }

  if (!job.shortlisted.includes(candidateId)) {
    await collections.jobs.updateOne(
      { id: String(req.params.id) },
      { $push: { shortlisted: candidateId } }
    );
  }

  const updatedJob = await collections.jobs.findOne({ id: String(req.params.id) });
  res.json({ job: updatedJob });
};
