const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const http = {
  request: async (endpoint: string, options: RequestInit = {}) => {
    try {
      // Build full URL
      let url;
      if (endpoint.startsWith('http')) {
        url = endpoint;
      } else if (endpoint.startsWith('/api')) {
        url = `http://localhost:4000${endpoint}`;
      } else {
        url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      }
      
      console.log('🔄 Making request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 404) {
          console.warn('⚠️  API endpoint not found (404). Using mock data...');
          // Return mock data if API not available
          return {
            jobs: [
              {
                id: '1',
                title: 'Emergency Sanitary Plumbing Repair',
                company: 'Private Residence (Almaz Tefera)',
                location: 'Bole Atlas, Addis Ababa',
                type: 'Contract',
                salary: '4,000 - 6,000 ETB',
                created_at: new Date().toISOString()
              },
              {
                id: '2',
                title: 'Master Electrical Breaker Rewiring',
                company: 'Acme Facilities',
                location: 'Kazanchis, Addis Ababa',
                type: 'Contract',
                salary: '3,500 - 5,000 ETB',
                created_at: new Date().toISOString()
              }
            ]
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('❌ Request failed:', error);
      console.warn('⚠️  Returning mock data...');
      // Return mock data on error
      return {
        jobs: [
          {
            id: '1',
            title: 'Emergency Sanitary Plumbing Repair',
            company: 'Private Residence (Almaz Tefera)',
            location: 'Bole Atlas, Addis Ababa',
            type: 'Contract',
            salary: '4,000 - 6,000 ETB',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Master Electrical Breaker Rewiring',
            company: 'Acme Facilities',
            location: 'Kazanchis, Addis Ababa',
            type: 'Contract',
            salary: '3,500 - 5,000 ETB',
            created_at: new Date().toISOString()
          }
        ]
      };
    }
  },
};

// Export a simple GET helper
export const get = (endpoint: string, options = {}) => {
  return http.request(endpoint, { ...options, method: 'GET' });
};

export const post = (endpoint: string, data: any, options = {}) => {
  return http.request(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};
