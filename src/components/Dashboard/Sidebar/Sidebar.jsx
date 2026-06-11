import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Receipt, Target, BarChart3,
  Settings, LogOut, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses',  icon: Receipt,         label: 'Expenses'  },
  { to: '/budgets',   icon: Target,          label: 'Budgets'   },
  { to: '/reports',   icon: BarChart3,       label: 'Reports'   },
  { to: '/settings',  icon: Settings,        label: 'Settings'  },
]

function getInitials(name) {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const displayName  = user?.name  || 'User'
  const displayEmail = user?.email || ''
  const initials     = getInitials(displayName)

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* ── Logo ── */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">X</div>
        {!collapsed && <span className="sidebar-logo-text">XpenseSync</span>}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          id="sidebar-collapse"
        >
          <ChevronRight size={14} className={collapsed ? 'rotate-0' : 'rotate-180'} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="sidebar-nav-group">
          {!collapsed && <span className="sidebar-nav-label">Main</span>}
          {navItems.slice(0, 4).map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              id={`nav-${label.toLowerCase()}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="sidebar-nav-icon" />
              {!collapsed && <span className="sidebar-nav-text">{label}</span>}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-nav-group">
          {!collapsed && <span className="sidebar-nav-label">Preferences</span>}
          {navItems.slice(4).map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              id={`nav-${label.toLowerCase()}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="sidebar-nav-icon" />
              {!collapsed && <span className="sidebar-nav-text">{label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── User footer ── */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{displayName}</div>
              <div className="sidebar-user-email">{displayEmail}</div>
            </div>
          )}
          {!collapsed && (
            <button
              className="sidebar-logout"
              onClick={logout}
              aria-label="Log out"
              id="sidebar-logout"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
