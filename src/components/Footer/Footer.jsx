import './Footer.css'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'API', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="logo-group mb-4">
              <div className="logo-mark">X</div>
              <span className="logo-text text-white">XpenseSync</span>
            </div>
            <p className="footer-tagline">
              Smart expense management for professionals
              and growing teams worldwide.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter" className="social-link" id="footer-twitter">𝕏</a>
              <a href="#" aria-label="LinkedIn" className="social-link" id="footer-linkedin">in</a>
              <a href="#" aria-label="GitHub" className="social-link" id="footer-github">⌥</a>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-col">
                <h4 className="footer-col-title">{category}</h4>
                <ul className="footer-link-list">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer-link" id={`footer-${link.toLowerCase().replace(' ', '-')}`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 XpenseSync, Inc. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">SOC 2 Type II</span>
            <span className="footer-badge">GDPR Compliant</span>
            <span className="footer-badge">256-bit SSL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
