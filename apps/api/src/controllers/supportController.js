import { collections } from '../data/db.js';

export const getTickets = async (req, res) => {
  const userTickets = await collections.tickets.find({ userId: req.user.id }).toArray();
  res.json({ tickets: userTickets });
};

export const createTicket = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required.' });
  }

  const tickets = await collections.tickets.find().toArray();
  const ticket = {
    id: `t${tickets.length + 1}`,
    userId: req.user.id,
    subject,
    message,
    status: 'Open',
    createdAt: new Date().toISOString(),
  };

  await collections.tickets.insertOne(ticket);
  res.status(201).json({ ticket });
};
