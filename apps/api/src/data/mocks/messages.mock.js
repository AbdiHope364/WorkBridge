export const mockMessages = [
  {
    conversationId: 'c1',
    participants: ['u1', 'u2'],
    updatedAt: '2026-05-03T10:25:00.000Z',
    messages: [
      {
        id: 'm1',
        senderId: 'u2',
        text: 'Hi Alex! We reviewed your application for the Senior Frontend Developer role and were very impressed with your portfolio.',
        createdAt: '2026-05-03T10:20:00.000Z',
        read: true,
      },
      {
        id: 'm2',
        senderId: 'u1',
        text: 'Hello Acme team, thank you for reaching out! I would love to discuss the project requirements and roadmap.',
        createdAt: '2026-05-03T10:22:00.000Z',
        read: true,
      },
      {
        id: 'm3',
        senderId: 'u2',
        text: 'Great! Are you available for a brief technical sync this Thursday at 2 PM UTC?',
        createdAt: '2026-05-03T10:25:00.000Z',
        read: false,
      },
    ],
  },
  {
    conversationId: 'c2',
    participants: ['u_seeker_2', 'u_emp_2'],
    updatedAt: '2026-05-04T12:00:00.000Z',
    messages: [
      {
        id: 'm4',
        senderId: 'u_emp_2',
        text: 'Hi Bethany, loved your UX case studies on Dribbble. We are designing a telemedicine portal and need your expertise.',
        createdAt: '2026-05-04T11:45:00.000Z',
        read: true,
      },
      {
        id: 'm5',
        senderId: 'u_seeker_2',
        text: 'Hi Dr. Connor! Healthcare UX is one of my passions. I can share some relevant wireframes later today.',
        createdAt: '2026-05-04T12:00:00.000Z',
        read: true,
      },
    ],
  },
];

