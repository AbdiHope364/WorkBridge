import { collections } from '../data/db.js';

export const getJobsPreview = async (req, res) => {
  const jobs = await collections.jobs.find().toArray();
  const preview = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
  }));
  res.json({ jobs: preview });
};

export const getWorkersPreview = async (req, res) => {
  const users = await collections.users.find({ role: 'worker' }).toArray();
  const workers = users.map((user) => ({
    id: user.id,
    name: user.name,
    headline: user.profile?.headline,
    skills: user.profile?.skills,
    location: user.profile?.location,
  }));
  res.json({ workers });
};

export const getFaqs = async (req, res) => {
  const faqs = await collections.faqs.find().toArray();
  res.json({ faqs });
};

export const submitContact = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  res.status(201).json({ message: 'Contact request submitted successfully.' });
};
