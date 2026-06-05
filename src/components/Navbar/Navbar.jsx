import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="logo-group" id="nav-logo">
          <div className="logo-mark">X</div>
          <span className="logo-text">XpenseSync</span>
        </Link>

        {/* Nav Links */}
        <nav className="navbar-links hide-mobile" aria-label="Main navigation">
          <a href="#features" className="nav-link" id="nav-features">Features</a>
          <a href="#pricing" className="nav-link" id="nav-pricing">Pricing</a>
          <a href="#testimonials" className="nav-link" id="nav-testimonials">Customers</a>
          <a href="#company" className="nav-link" id="nav-company">Company</a>
        </nav>

        {/* CTA */}
        <div className="navbar-actions">
          <Link to="/login" className="btn btn-ghost btn-sm" id="nav-login">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm" id="nav-signup">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
