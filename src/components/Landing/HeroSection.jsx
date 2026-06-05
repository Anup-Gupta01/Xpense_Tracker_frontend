import { Link } from 'react-router-dom'
import { ArrowRight, Shield, CreditCard, CheckCircle } from 'lucide-react'
import './HeroSection.css'

const trustItems = [
  { icon: Shield, label: 'Bank-level Security' },
  { icon: CreditCard, label: 'No Credit Card Required' },
  { icon: CheckCircle, label: 'Cancel Anytime' },
]

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content animate-fade-in-up">
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="badge badge-teal">New — AI-powered insights</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline font-display">
            Take Control of Your<br />
            <span className="hero-headline-accent">Financial Future</span>
          </h1>

          <p className="hero-subheadline">
            Track expenses, manage budgets, and gain insights into your spending
            with our intelligent expense management platform.
          </p>

          {/* CTA */}
          <div className="hero-cta animate-fade-in-up delay-2">
            <Link to="/signup" className="btn btn-primary btn-lg" id="hero-get-started">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg" id="hero-view-dashboard">
              View Dashboard
            </Link>
          </div>

          {/* Trust row */}
          <div className="hero-trust animate-fade-in-up delay-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="hero-trust-item">
                <Icon size={14} className="hero-trust-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview animate-fade-in-up delay-4">
          <div className="hero-preview-frame">
            <div className="preview-header">
              <div className="preview-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="preview-bar" />
            </div>
            <div className="preview-body">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div className="mockup-dashboard">
      {/* Sidebar */}
      <aside className="mockup-sidebar">
        <div className="mockup-logo-row">
          <div className="mockup-logo">X</div>
          <div className="mockup-logo-text" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`mockup-nav-item ${i === 0 ? 'active' : ''}`}>
            <div className="mockup-nav-icon" />
            <div className="mockup-nav-label" />
          </div>
        ))}
      </aside>

      {/* Main */}
      <main className="mockup-main">
        {/* Stats row */}
        <div className="mockup-stats">
          {['Total Spent', 'Budget Left', 'Savings', 'Transactions'].map((label, i) => (
            <div key={label} className="mockup-stat-card">
              <div className="mockup-stat-label">{label}</div>
              <div className={`mockup-stat-value ${i === 0 ? 'teal' : ''}`} />
              <div className="mockup-stat-change" />
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="mockup-chart-area">
          <div className="mockup-chart-header">
            <div className="mockup-chart-title" />
            <div className="mockup-chart-legend">
              <span className="legend-dot teal" /><div className="legend-label" />
              <span className="legend-dot indigo" /><div className="legend-label" />
            </div>
          </div>
          <div className="mockup-chart">
            {[40, 65, 45, 75, 55, 85, 60, 90, 70, 80, 55, 72].map((h, i) => (
              <div key={i} className="mockup-bar-wrapper">
                <div className="mockup-bar" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="mockup-transactions">
          <div className="mockup-section-title" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mockup-tx-row">
              <div className="mockup-tx-icon" />
              <div className="mockup-tx-info">
                <div className="mockup-tx-name" />
                <div className="mockup-tx-date" />
              </div>
              <div className={`mockup-tx-amount ${i % 2 === 0 ? 'neg' : 'pos'}`} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
