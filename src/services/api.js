import axios from 'axios'

// Create axios instance — Vite proxy forwards /api → localhost:5000
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ── Request interceptor: inject JWT ──────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('xpense_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle 401 ─────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage and redirect
      localStorage.removeItem('xpense_token')
      localStorage.removeItem('xpense_user')
      // Only redirect if not already on an auth page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register:       (data) => api.post('/auth/register', data),
  login:          (data) => api.post('/auth/login', data),
  getMe:          ()     => api.get('/auth/me'),
  updateProfile:  (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  deleteAccount:  ()     => api.delete('/auth/me'),
}

// ── Expenses ──────────────────────────────────────────────────────────────────
export const expensesAPI = {
  getAll:  (params) => api.get('/expenses', { params }),
  create:  (data)   => api.post('/expenses', data),
  update:  (id, data) => api.put(`/expenses/${id}`, data),
  delete:  (id)     => api.delete(`/expenses/${id}`),
}

// ── Budgets ───────────────────────────────────────────────────────────────────
export const budgetsAPI = {
  getAll:  ()           => api.get('/budgets'),
  create:  (data)       => api.post('/budgets', data),
  update:  (id, data)   => api.put(`/budgets/${id}`, data),
  delete:  (id)         => api.delete(`/budgets/${id}`),
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getSummary:      () => api.get('/dashboard/summary'),
  getChartData:    () => api.get('/dashboard/chart-data'),
  getCategories:   () => api.get('/dashboard/categories'),
  getTransactions: () => api.get('/dashboard/transactions'),
}

// ── Reports ───────────────────────────────────────────────────────────────────
export const reportsAPI = {
  getData: (period) => api.get('/reports', { params: { period } }),
}

export default api
