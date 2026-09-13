import { collections } from '../data/db.js';

export const getJobs = async (req, res) => {
  const query = String(req.query.q || '').toLowerCase();
  const filter = query ? {
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { company: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
    ],
  } : {};

  const jobs = await collections.jobs.find(filter).toArray();
  res.json({ jobs });
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
  const job = await collections.jobs.findOne({ id: String(req.params.id) });
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json({ job });
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
