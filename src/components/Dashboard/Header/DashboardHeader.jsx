import { Bell, Search, Plus, Calendar } from 'lucide-react'
import './DashboardHeader.css'

export default function DashboardHeader({ title = 'Dashboard', subtitle }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <header className="dash-header">
      {/* Left: title */}
      <div className="dash-header-left">
        <h1 className="dash-header-title">{title}</h1>
        <p className="dash-header-subtitle">
          {subtitle || `Welcome back, John. Here's your financial overview.`}
        </p>
      </div>

      {/* Right: actions */}
      <div className="dash-header-right">
        {/* Date */}
        <div className="dash-header-date" id="header-date">
          <Calendar size={13} />
          <span>{today}</span>
        </div>

        {/* Search */}
        <div className="dash-search-wrap" id="header-search">
          <Search size={14} className="dash-search-icon" />
          <input
            type="text"
            placeholder="Search transactions…"
            className="dash-search-input"
            aria-label="Search transactions"
          />
        </div>

        {/* Notification bell */}
        <button
          className="dash-icon-btn"
          aria-label="Notifications"
          id="header-notifications"
        >
          <Bell size={16} />
          <span className="notif-dot" aria-hidden="true" />
        </button>

        {/* Add expense */}
        <button className="btn btn-primary btn-sm" id="header-add-expense">
          <Plus size={14} />
          Add Expense
        </button>
      </div>
    </header>
  )
}
