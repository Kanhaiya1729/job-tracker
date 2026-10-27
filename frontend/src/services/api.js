import axios from 'axios';

// Base API configuration (points to your Express backend on port 3000)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jobtrack_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error messages cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or unauthorized, clear storage
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jobtrack_token');
      localStorage.removeItem('jobtrack_user');
    }
    
    // Extract backend error message if available
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      'An unexpected error occurred. Please try again.';

    return Promise.reject(new Error(message));
  }
);


export const authService = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};


export const applicationsService = {
  getAll: async () => {
    const response = await api.get('/applications');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/applications/stats');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  create: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },
  update: async(id,applicationData)=>{
    const  response=await api.put(`/applications${id}`,applicationData);
    return response.data;
  },
  delete:async(id)=>{
    const  response=await api.delete(`/applications${id}`);
    return response.data;
  }
};

export default api;1