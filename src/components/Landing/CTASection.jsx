import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './CTASection.css'

export default function CTASection() {
  return (
    <section className="cta-section section-sm" id="cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <span className="badge badge-teal mb-4">Start for free</span>
            <h2 className="cta-title font-display">
              Ready to sync your finances?
            </h2>
            <p className="cta-subtitle">
              Join over 50,000 professionals who trust XpenseSync
              to manage their spending and achieve their financial goals.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-lg" id="cta-signup">
                Start Free Trial
                <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg cta-outline" id="cta-login">
                Sign In
              </Link>
            </div>
            <p className="cta-footnote">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>

          {/* Decorative element */}
          <div className="cta-decoration" aria-hidden="true">
            <div className="cta-deco-ring ring-1" />
            <div className="cta-deco-ring ring-2" />
            <div className="cta-deco-ring ring-3" />
          </div>
        </div>
      </div>
    </section>
  )
}
