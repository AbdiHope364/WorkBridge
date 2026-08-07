export const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'Addis Ababa',
    type: 'Full-time',
    salary: '$50,000 - $70,000',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Digital Solutions',
    location: 'Remote',
    type: 'Contract',
    salary: '$40,000 - $60,000',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Addis Ababa',
    type: 'Full-time',
    salary: '$35,000 - $50,000',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Remote',
    type: 'Contract',
    salary: '$60,000 - $80,000',
  },
];

export const mockApi = {
  getJobs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs), 500);
    });
  },
};
