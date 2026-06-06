import Sidebar from '../Sidebar/Sidebar'
import DashboardHeader from '../Header/DashboardHeader'
import './PageShell.css'

/**
 * PageShell
 * ─────────
 * Shared wrapper for every authenticated page.
 * Provides Sidebar + Header + scrollable content region.
 *
 * Props:
 *   title      – Page heading (passed to DashboardHeader)
 *   subtitle   – Page sub-heading
 *   headerRight – React node rendered in the header's right slot
 *   children   – Page body content
 */
export default function PageShell({ title, subtitle, headerRight, children }) {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          headerRight={headerRight}
        />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  )
}
