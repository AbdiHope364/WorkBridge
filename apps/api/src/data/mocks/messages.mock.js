export const mockMessages = [
  {
    conversationId: 'c1',
    participants: ['u1', 'u2'],
    updatedAt: '2026-05-03T10:25:00.000Z',
    messages: [
      {
        id: 'm1',
        senderId: 'u2',
        text: 'Hi Alex! We reviewed your quotation for the Villa Interior Painting project and would like to proceed.',
        createdAt: '2026-05-03T10:20:00.000Z',
        read: true,
      },
      {
        id: 'm2',
        senderId: 'u1',
        text: 'Hello Acme team, thank you! I can bring the color swatches and start plaster prep work on Thursday morning.',
        createdAt: '2026-05-03T10:22:00.000Z',
        read: true,
      },
      {
        id: 'm3',
        senderId: 'u2',
        text: 'Perfect! Please confirm if 9:00 AM at the Sarbet villa works for you.',
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
        text: 'Hi Teshale, we saw your profile for Appliance Repair. Our supermarket walk-in freezer compressor is acting up.',
        createdAt: '2026-05-04T11:45:00.000Z',
        read: true,
      },
      {
        id: 'm5',
        senderId: 'u_seeker_2',
        text: 'Hi Dr. Connor! I carry R134a refrigerant and spare compressor switches in my service kit. I can arrive within 45 minutes.',
        createdAt: '2026-05-04T12:00:00.000Z',
        read: true,
      },
    ],
  },
];

