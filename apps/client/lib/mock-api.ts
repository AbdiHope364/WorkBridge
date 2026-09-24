export const mockJobs = [
  {
    id: '1',
    title: 'Emergency Plumbing & Pipe Leak Fix',
    company: 'Private Villa Resident (Almaz Tefera)',
    location: 'Bole Atlas, Addis Ababa',
    type: 'Contract',
    salary: '4,000 - 6,000 ETB',
  },
  {
    id: '2',
    title: 'DB Box Electrical Rewiring & Breaker Fitting',
    company: 'Acme Facilities Management',
    location: 'Kazanchis, Addis Ababa',
    type: 'Contract',
    salary: '3,500 - 5,000 ETB',
  },
  {
    id: '3',
    title: 'Custom Hardwood Kitchen Cabinetry',
    company: 'Private Residence (Kaleb Tesfaye)',
    location: 'CMC Michael, Addis Ababa',
    type: 'Contract',
    salary: '18,000 - 25,000 ETB',
  },
  {
    id: '4',
    title: 'Interior Villa Wall Painting & Drywall Plastering',
    company: 'Addis Property Developments',
    location: 'Sarbet, Addis Ababa',
    type: 'Contract',
    salary: '8,000 - 12,000 ETB',
  },
];

export const mockApi = {
  getJobs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs), 500);
    });
  },
};
