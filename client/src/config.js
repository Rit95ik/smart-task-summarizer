// API Configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fix-list-lexmark-techno.trycloudflare.com/api' 
  : 'http://localhost:3001';

// Frontend URL for reference
const FRONTEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://none-primary-speeds-bean.trycloudflare.com'
  : 'http://localhost:5174';

// For debugging
console.log('API URL:', API_URL);
console.log('Frontend URL:', FRONTEND_URL);

export { API_URL, FRONTEND_URL };