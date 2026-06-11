import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './AuthPages.css'

const passwordStrengthLevels = [
  { label: 'Weak',   color: '#ef4444' },
  { label: 'Fair',   color: '#f59e0b' },
  { label: 'Good',   color: '#3b82f6' },
  { label: 'Strong', color: '#22c55e' },
]

function getPasswordStrength(pwd) {
  if (!pwd) return -1
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score - 1
}

const benefits = [
  '14-day free trial, no credit card required',
  'Connect unlimited accounts & cards',
  'AI-powered expense categorization',
  'Cancel anytime — no questions asked',
]

export default function SignupPage() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', agreeTerms: false })
  const [error, setError] = useState('')

  const strengthIndex = getPasswordStrength(formData.password)
  const strength = strengthIndex >= 0 ? passwordStrengthLevels[strengthIndex] : null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName.trim()) { setError('Please enter your full name.'); return }
    if (!formData.email)            { setError('Please enter your email.'); return }
    if (formData.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!formData.agreeTerms)       { setError('Please agree to the Terms of Service.'); return }

    const result = await register(formData.fullName.trim(), formData.email, formData.password)
    if (result.success) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-layout auth-layout-reverse">
      {/* ─── Left panel — Branding ─── */}
      <div className="auth-brand-panel" aria-hidden="true">
        <div className="auth-brand-content">
          <div className="auth-brand-visual">
            <div className="brand-icon-wrap">
              <div className="brand-big-logo">X</div>
            </div>
          </div>
          <h2 className="auth-brand-headline font-display">
            Start tracking<br />smarter today
          </h2>
          <p className="auth-brand-body">
            Everything you need to manage your business expenses
            in one clean, powerful platform.
          </p>
          <ul className="auth-benefits">
            {benefits.map(b => (
              <li key={b} className="auth-benefit-item">
                <span className="benefit-check"><Check size={12} /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Right panel — Form ─── */}
      <div className="auth-form-panel">
        <Link to="/" className="auth-back" id="signup-back-home">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="auth-form-content">
          <Link to="/" className="logo-group mb-8" id="signup-logo">
            <div className="logo-mark">X</div>
            <span className="logo-text">XpenseSync</span>
          </Link>

          <div className="auth-heading">
            <h1 className="auth-title font-display">Create your account</h1>
            <p className="auth-subtitle">Start your 14-day free trial — no card required</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-error-banner" role="alert" id="signup-error-banner">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Social signup */}
          <div className="auth-social auth-social-top">
            <button className="btn btn-social flex-1" id="signup-google" type="button">
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          <div className="divider auth-divider">Or sign up with email</div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">Full name</label>
              <input
                id="signup-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Smith"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Work email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <div className="form-input-wrapper">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Create a strong password"
                  className="form-input form-input-with-icon-right"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="form-input-icon-right"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="signup-toggle-password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= strengthIndex ? strength?.color : 'var(--slate-200)' }}
                      />
                    ))}
                  </div>
                  {strength && <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>}
                </div>
              )}
              <span className="form-hint">Use 8+ characters with uppercase, numbers, and symbols</span>
            </div>

            <label className="checkbox-wrapper" id="signup-terms-label">
              <input
                type="checkbox"
                name="agreeTerms"
                id="signup-terms"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span className="checkbox-label">
                I agree to the{' '}
                <Link to="/terms" className="link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="link">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              id="signup-submit"
              disabled={!formData.agreeTerms || loading}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Creating account…</>
              ) : (
                'Create free account'
              )}
            </button>
          </form>

          <p className="auth-switch text-center">
            Already have an account?{' '}
            <Link to="/login" className="link" id="signup-to-login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}
