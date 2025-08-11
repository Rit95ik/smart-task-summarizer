// API Configuration
const envApiUrl = import.meta.env.VITE_API_URL;
const currentMode = import.meta.env.MODE;

const API_URL = envApiUrl || 'https://smart-task-summarizer-backend.onrender.com';

// Frontend URL for reference  
const FRONTEND_URL = currentMode === 'production'
  ? window.location.origin
  : 'http://localhost:5174';

// For debugging
console.log('API URL:', API_URL);
console.log('Frontend URL:', FRONTEND_URL);
console.log('Environment:', currentMode);

export { API_URL, FRONTEND_URL };
