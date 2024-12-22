export const APP_CONFIG = {
  NAME: 'PropDekho CRM',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
};

export const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  DASHBOARD: '/dashboard',
  PROPERTIES: '/properties',
  LEADS: '/leads',
  CLIENTS: '/clients',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PROPERTIES: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
  },
  LEADS: {
    LIST: '/leads',
    DETAIL: (id: string) => `/leads/${id}`,
  },
}; 