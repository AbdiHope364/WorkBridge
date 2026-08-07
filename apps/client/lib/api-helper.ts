// Switch between real API and mock API
// Change this to true to use mock data
const USE_MOCK = false;

import { http } from './http';
import { mockApi } from './mock-api';

export const api = USE_MOCK ? mockApi : http;

// Export for easy switching
export { USE_MOCK };
