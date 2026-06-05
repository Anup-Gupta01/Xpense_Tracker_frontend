import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Receipt, Target, BarChart3,
  Settings, LogOut, ChevronRight, Bell
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses',   icon: Receipt,         label: 'Expenses'  },
  { to: '/budgets',    icon: Target,          label: 'Budgets'   },
  { to: '/reports',    icon: BarChart3,       label: 'Reports'   },
  { to: '/settings',   icon: Settings,        label: 'Settings'  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

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
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
              id={`nav-${label.toLowerCase()}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="sidebar-nav-icon" />
              {!collapsed && <span className="sidebar-nav-text">{label}</span>}
              {!collapsed && label === 'Expenses' && (
                <span className="sidebar-nav-badge">3</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-nav-group">
          {!collapsed && <span className="sidebar-nav-label">Preferences</span>}
          {navItems.slice(4).map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
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
          <div className="sidebar-avatar">JC</div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">John Chen</div>
              <div className="sidebar-user-email">john@company.com</div>
            </div>
          )}
          {!collapsed && (
            <button
              className="sidebar-logout"
              onClick={() => navigate('/login')}
              aria-label="Log out"
              id="sidebar-logout"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
