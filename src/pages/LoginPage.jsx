import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import './AuthPages.css'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder — backend integration comes later
    console.log('Login:', formData)
  }

  return (
    <div className="auth-layout">
      {/* ─── Left panel — Form ─── */}
      <div className="auth-form-panel">
        {/* Back to home */}
        <Link to="/" className="auth-back" id="login-back-home">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="auth-form-content">
          {/* Logo */}
          <Link to="/" className="logo-group mb-8" id="login-logo">
            <div className="logo-mark">X</div>
            <span className="logo-text">XpenseSync</span>
          </Link>

          {/* Header */}
          <div className="auth-heading">
            <h1 className="auth-title font-display">Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <div className="form-input-wrapper">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="form-input form-input-with-icon-right"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="form-input-icon-right"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="login-toggle-password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="auth-row">
              <label className="checkbox-wrapper" id="login-remember-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="login-remember"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <Link to="/forgot-password" className="link text-sm" id="login-forgot">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              id="login-submit"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="divider auth-divider">Or continue with</div>

          {/* Social */}
          <div className="auth-social">
            <button className="btn btn-social flex-1" id="login-google">
              <GoogleIcon />
              Google
            </button>
            <button className="btn btn-social flex-1" id="login-github">
              <GitHubIcon />
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="auth-switch text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="link" id="login-to-signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* ─── Right panel — Branding ─── */}
      <div className="auth-brand-panel" aria-hidden="true">
        <div className="auth-brand-content">
          <div className="auth-brand-visual">
            <div className="brand-icon-wrap">
              <div className="brand-big-logo">X</div>
            </div>
          </div>
          <h2 className="auth-brand-headline font-display">
            Your finances,<br />perfectly synced
          </h2>
          <p className="auth-brand-body">
            Join thousands of professionals who trust XpenseSync to
            manage their expenses and budgets efficiently.
          </p>
          <div className="auth-brand-stats">
            <div className="brand-stat">
              <div className="brand-stat-val">50k+</div>
              <div className="brand-stat-lbl">Professionals</div>
            </div>
            <div className="brand-stat-divider" />
            <div className="brand-stat">
              <div className="brand-stat-val">$2.4B</div>
              <div className="brand-stat-lbl">Tracked</div>
            </div>
            <div className="brand-stat-divider" />
            <div className="brand-stat">
              <div className="brand-stat-val">4.9★</div>
              <div className="brand-stat-lbl">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Icon components ─── */
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

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
