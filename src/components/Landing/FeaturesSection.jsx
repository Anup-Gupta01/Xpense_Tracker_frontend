import {
  TrendingUp, PieChart, Bell, Shield, Zap, BarChart2,
  Globe, Lock, RefreshCw
} from 'lucide-react'
import './FeaturesSection.css'

const features = [
  {
    icon: TrendingUp,
    title: 'Smart Tracking',
    description: 'Automatically categorize and track your business expenses with intelligent AI-powered insights.',
    accent: 'teal',
    id: 'feature-tracking',
  },
  {
    icon: PieChart,
    title: 'Budget Management',
    description: 'Set budgets and get alerts before you overspend on any category. Stay in control at all times.',
    accent: 'indigo',
    id: 'feature-budget',
  },
  {
    icon: BarChart2,
    title: 'Detailed Reports',
    description: 'Visualize your spending patterns with beautiful charts and actionable financial analytics.',
    accent: 'teal',
    id: 'feature-reports',
  },
  {
    icon: Bell,
    title: 'Real-time Alerts',
    description: 'Stay informed with instant notifications about your financial activity and unusual charges.',
    accent: 'indigo',
    id: 'feature-alerts',
  },
  {
    icon: Globe,
    title: 'Multi-currency',
    description: 'Track expenses across currencies with automatic conversion. Perfect for global teams.',
    accent: 'teal',
    id: 'feature-currency',
  },
  {
    icon: RefreshCw,
    title: 'Auto-sync',
    description: 'Connect your bank and cards. Transactions sync automatically — no manual entry needed.',
    accent: 'indigo',
    id: 'feature-sync',
  },
]

const highlights = [
  { icon: Shield, text: 'SOC 2 Type II Certified' },
  { icon: Lock, text: 'End-to-end encrypted' },
  { icon: Zap, text: 'Real-time sync' },
]

export default function FeaturesSection() {
  return (
    <section className="features-section section" id="features">
      <div className="container">
        {/* Header */}
        <div className="features-header text-center">
          <span className="badge badge-indigo mb-3">Features</span>
          <h2 className="features-title font-display">
            Everything You Need
          </h2>
          <p className="features-subtitle">
            Powerful features designed to help you stay in sync with your finances.
          </p>
        </div>

        {/* Feature grid */}
        <div className="features-grid">
          {features.map(({ icon: Icon, title, description, accent, id }) => (
            <div key={id} className="feature-card card card-hover" id={id}>
              <div className="card-body">
                <div className={`feature-icon-wrap accent-${accent}`}>
                  <Icon size={20} />
                </div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights bar */}
        <div className="features-highlights">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="highlight-item">
              <Icon size={16} className="highlight-icon" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
