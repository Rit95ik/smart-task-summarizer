// API Configuration
const API_URL = process.env.VITE_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://smart-task-summarizer-backend.onrender.com'
    : 'http://localhost:3001');

// Frontend URL for reference  
const FRONTEND_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'http://localhost:5174';

// For debugging
console.log('API URL:', API_URL);
console.log('Frontend URL:', FRONTEND_URL);
console.log('Environment:', process.env.NODE_ENV);

export { API_URL, FRONTEND_URL };
