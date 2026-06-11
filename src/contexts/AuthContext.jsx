import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => {
    try {
      const stored = localStorage.getItem('xpense_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [token,   setToken]   = useState(() => localStorage.getItem('xpense_token') || null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  // ── Persist to localStorage ───────────────────────────────────────────────
  useEffect(() => {
    if (token) {
      localStorage.setItem('xpense_token', token)
    } else {
      localStorage.removeItem('xpense_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('xpense_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('xpense_user')
    }
  }, [user])

  // ── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authAPI.register({ name, email, password })
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.'
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authAPI.login({ email, password })
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setError(null)
  }, [])

  // ── Update profile (from SettingsPage) ────────────────────────────────────
  const updateUser = useCallback((updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }))
  }, [])

  // ── Clear error ───────────────────────────────────────────────────────────
  const clearError = useCallback(() => setError(null), [])

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    logout,
    register,
    updateUser,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

export default AuthContext
