import { Star } from 'lucide-react'
import './TestimonialsSection.css'

const testimonials = [
  {
    quote: '"XpenseSync transformed how I manage my business expenses. The insights are invaluable."',
    name: 'Sarah Chen',
    title: 'Founder, TechStart',
    avatar: 'SC',
    rating: 5,
    id: 'testimonial-1',
  },
  {
    quote: '"Finally, an expense tracker that\'s both powerful and easy to use. I highly recommended."',
    name: 'Michael Torres',
    title: 'CFO, GrowthCo',
    avatar: 'MT',
    rating: 5,
    id: 'testimonial-2',
  },
  {
    quote: '"The budget tracking feature alone has saved me hundreds of dollars every month."',
    name: 'Emily Rodriguez',
    title: 'Marketing Director',
    avatar: 'ER',
    rating: 5,
    id: 'testimonial-3',
  },
]

const stats = [
  { value: '50,000+', label: 'Active users' },
  { value: '$2.4B+', label: 'Tracked annually' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9/5', label: 'Average rating' },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className="testimonials-header text-center">
          <span className="badge badge-teal mb-3">Testimonials</span>
          <h2 className="testimonials-title font-display">
            Trusted by Professionals
          </h2>
          <p className="testimonials-subtitle">
            See what our users have to say
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="testimonials-grid">
          {testimonials.map(({ quote, name, title, avatar, rating, id }) => (
            <div key={id} className="testimonial-card card" id={id}>
              <div className="card-body">
                {/* Stars */}
                <div className="testimonial-stars">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">{quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{avatar}</div>
                  <div>
                    <div className="testimonial-name">{name}</div>
                    <div className="testimonial-role">{title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
