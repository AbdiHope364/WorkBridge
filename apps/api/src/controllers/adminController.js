import { collections } from '../data/db.js';

export const getAdminUsers = async (req, res) => {
  const users = await collections.users.find().toArray();
  res.json({ users });
};

export const getAdminJobs = async (req, res) => {
  const jobs = await collections.jobs.find().toArray();
  res.json({ jobs });
};

export const getReports = async (req, res) => {
  const reports = await collections.reports.find().toArray();
  res.json({ reports });
};

export const getDisputes = async (req, res) => {
  const disputes = await collections.disputes.find().toArray();
  res.json({ disputes });
};

export const getDashboardStats = async (req, res) => {
  const totalJobseekers = await collections.users.countDocuments({ role: 'worker' });
  const totalEmployers = await collections.users.countDocuments({ role: 'employer' });
  const activeJobs = await collections.jobs.countDocuments({ isActive: true });

  const users = await collections.users.find().toArray();
  const totalApplications = users.reduce((sum, user) => sum + (user.applications?.length || 0), 0);

  res.json({ totalJobseekers, totalEmployers, activeJobs, totalApplications });
};

export const getDashboardOverview = async (req, res) => {
  const jobs = await collections.jobs.find().toArray();
  const users = await collections.users.find().toArray();

  const monthMap = new Map();

  jobs.forEach((job) => {
    const month = job.createdAt?.slice(0, 7);
    if (!month) return;
    if (!monthMap.has(month)) monthMap.set(month, { name: month, jobseeker: 0, employer: 0, jobs: 0, applications: 0 });
    const entry = monthMap.get(month);
    entry.jobs += 1;
    entry.applications += job.applicants?.length || 0;
  });

  users.forEach((user) => {
    const month = user.createdAt?.slice(0, 7);
    if (!month) return;
    if (!monthMap.has(month)) monthMap.set(month, { name: month, jobseeker: 0, employer: 0, jobs: 0, applications: 0 });
    const entry = monthMap.get(month);
    if (user.role === 'worker') entry.jobseeker += 1;
    if (user.role === 'employer') entry.employer += 1;
  });

  const overviewData = Array.from(monthMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  res.json({ overviewData });
};

export const getDashboardJobStatus = async (req, res) => {
  const jobs = await collections.jobs.find().toArray();
  const statusCounts = {};

  jobs.forEach((job) => {
    const status = job.status || (job.isActive ? 'Active' : 'Inactive');
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const jobStatusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  res.json({ jobStatusData });
};

export const getDashboardCategories = async (req, res) => {
  const jobs = await collections.jobs.find().toArray();
  const categoryMap = {};

  jobs.forEach((job) => {
    const cat = job.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const categories = Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  res.json({ categories });
};

export const getDashboardVerifications = async (req, res) => {
  const users = await collections.users.find().toArray();
  const pending = users.filter((u) => !u.verified).length;
  const approved = users.filter((u) => u.verified).length;

  res.json({
    verificationData: [
      { name: 'Pending', value: pending, color: '#4100F2' },
      { name: 'Approved', value: approved, color: '#00D47E' },
    ],
  });
};

export const verifyUser = async (req, res) => {
  const user = await collections.users.findOne({ id: req.params.id });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  await collections.users.updateOne(
    { id: req.params.id },
    { $set: { verified: true } }
  );

  const updated = await collections.users.findOne({ id: req.params.id });
  res.json({ user: updated });
};

export const verifyCompany = async (req, res) => {
  const company = await collections.users.findOne({ id: req.params.id, role: 'employer' });
  if (!company) {
    return res.status(404).json({ error: 'Company not found.' });
  }

  await collections.users.updateOne(
    { id: req.params.id },
    { $set: { verified: true } }
  );

  const updated = await collections.users.findOne({ id: req.params.id });
  res.json({ company: updated });
};

export const resolveDispute = async (req, res) => {
  const dispute = await collections.disputes.findOne({ id: req.params.id });
  if (!dispute) {
    return res.status(404).json({ error: 'Dispute not found.' });
  }

  const updated = await collections.disputes.findOneAndUpdate(
    { id: req.params.id },
    { $set: { status: req.body.status || 'Resolved' } },
    { returnDocument: 'after' }
  );

  res.json({ dispute: updated.value });
};

export const getVerifications = async (req, res) => {
  const pendingUsers = await collections.users.find({ verified: false }).toArray();
  const verifications = pendingUsers.map(user => ({
    id: `v_${user.id}`,
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    type: user.role === 'employer' ? 'company' : 'individual',
    status: 'pending',
    createdAt: user.createdAt || new Date().toISOString(),
  }));
  res.json(verifications);
};

export const approveVerification = async (req, res) => {
  const userId = req.params.id.replace(/^v_/, '');
  const user = await collections.users.findOne({ id: userId });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  await collections.users.updateOne(
    { id: userId },
    { $set: { verified: true } }
  );

  const updated = await collections.users.findOne({ id: userId });
  res.json({ success: true, user: updated });
};
