import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/LoginPage'
import SignupPage     from './pages/SignupPage'
import DashboardPage  from './pages/DashboardPage'
import ExpensesPage   from './pages/ExpensesPage'
import BudgetsPage    from './pages/BudgetsPage'
import ReportsPage    from './pages/ReportsPage'
import SettingsPage   from './pages/SettingsPage'

// ── Guard: redirect to /login if not authenticated ─────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

// ── Guard: redirect to /dashboard if already authenticated ─────────────────
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login"  element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/expenses"  element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
      <Route path="/budgets"   element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>} />
      <Route path="/reports"   element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/settings"  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
