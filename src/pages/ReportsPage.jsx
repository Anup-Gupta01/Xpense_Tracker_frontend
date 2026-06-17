import { useState, useEffect, useCallback } from 'react'
import {
  Download, FileText, Table2, BarChart3,
  TrendingUp, TrendingDown, DollarSign, AlertTriangle,
  Loader2,
} from 'lucide-react'
import {
  Chart,
  BarElement, LineElement, ArcElement,
  CategoryScale, LinearScale, PointElement,
  Tooltip, Legend, Filler,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import PageShell    from '../components/Dashboard/PageShell/PageShell'
import { reportsAPI } from '../services/api'
import { useCurrency } from '../contexts/CurrencyContext'
import {
  monthlySpendingData  as mockMonthly,
  categoryBreakdownData as mockCatBreakdown,
  weeklyTrendData      as mockWeekly,
  reportStats          as mockStats,
} from '../data/expensesMockData'
import './ReportsPage.css'

Chart.register(BarElement, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler)

// ── Chart defaults ────────────────────────────────────────────────────────────
const CHART_FONT = "'Inter', system-ui, sans-serif"

const barOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { family: CHART_FONT, size: 12 }, color: '#475569', boxWidth: 12, padding: 16 } },
    tooltip: { bodyFont: { family: CHART_FONT }, titleFont: { family: CHART_FONT } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: CHART_FONT, size: 12 }, color: '#94a3b8' } },
    y: {
      grid: { color: 'rgba(148,163,184,0.1)' },
      ticks: { font: { family: CHART_FONT, size: 12 }, color: '#94a3b8', callback: v => `$${(v/1000).toFixed(0)}k` },
    },
  },
}

const lineOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { family: CHART_FONT, size: 12 }, color: '#475569', boxWidth: 12, padding: 16 } },
    tooltip: { bodyFont: { family: CHART_FONT }, titleFont: { family: CHART_FONT } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: CHART_FONT, size: 12 }, color: '#94a3b8' } },
    y: {
      grid: { color: 'rgba(148,163,184,0.1)' },
      ticks: { font: { family: CHART_FONT, size: 12 }, color: '#94a3b8', callback: v => `$${v}` },
    },
  },
}

const doughnutOpts = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: { display: false },
    tooltip: { bodyFont: { family: CHART_FONT }, titleFont: { family: CHART_FONT } },
  },
}

const PERIODS = ['Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year']
const PERIOD_KEY_MAP = {
  'Last Month':    'lastmonth',
  'Last 3 Months': 'last3months',
  'Last 6 Months': 'last6months',
  'This Year':     'thisyear',
}

// ── Component ────────────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const { formatCurrency } = useCurrency()
  const [period,    setPeriod]    = useState('Last 6 Months')
  const [loading,   setLoading]   = useState(true)
  const [reportData, setReportData] = useState(null)

  const fetchReport = useCallback(async (p) => {
    setLoading(true)
    try {
      const key = PERIOD_KEY_MAP[p] || 'last6months'
      const { data } = await reportsAPI.getData(key)
      setReportData(data.data)
    } catch (err) {
      console.error('Report fetch error:', err)
      // Fallback to mock data
      setReportData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchReport(period) }, [period, fetchReport])

  // ── Derived chart data ────────────────────────────────────────────────────
  const monthly     = reportData?.monthlySpending  || mockMonthly
  const catBreakdown = reportData?.categoryBreakdown || mockCatBreakdown
  const weekly      = reportData?.weeklyTrend      || mockWeekly
  const stats       = reportData?.stats            || mockStats
  const summary     = reportData?.summary          || null

  const barData = {
    labels: monthly.labels,
    datasets: [
      { label: 'Income',   data: monthly.income,   backgroundColor: 'rgba(99, 102, 241, 0.85)', borderRadius: 5, barPercentage: 0.55 },
      { label: 'Expenses', data: monthly.expenses, backgroundColor: 'rgba(20, 184, 166, 0.85)', borderRadius: 5, barPercentage: 0.55 },
      { label: 'Savings',  data: monthly.savings,  backgroundColor: 'rgba(245, 158, 11, 0.75)', borderRadius: 5, barPercentage: 0.55 },
    ],
  }

  const trendData = {
    labels: (weekly.labels || ['Week 1','Week 2','Week 3','Week 4']),
    datasets: [
      {
        label: 'This Month',  data: weekly.thisMonth,
        borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,0.08)',
        borderWidth: 2.5, tension: 0.4, fill: true,
        pointBackgroundColor: '#14b8a6', pointRadius: 4, pointHoverRadius: 6,
      },
      {
        label: 'Last Month',  data: weekly.lastMonth,
        borderColor: '#94a3b8', backgroundColor: 'transparent',
        borderWidth: 2, borderDash: [6, 3], tension: 0.4,
        pointBackgroundColor: '#94a3b8', pointRadius: 4, pointHoverRadius: 6,
      },
    ],
  }

  const donutData = {
    labels: catBreakdown.map(c => c.label),
    datasets: [{ data: catBreakdown.map(c => c.value), backgroundColor: catBreakdown.map(c => c.color), borderWidth: 0, hoverOffset: 6 }],
  }

  const statCards = [
    { label: 'Total Spent',      value: stats.totalSpent,      sub: 'This period',      icon: DollarSign,   color: 'teal',   trend: 'down', change: '' },
    { label: 'Highest Category', value: stats.highestCategory, sub: 'Top expense',      icon: BarChart3,    color: 'indigo', trend: 'up',   change: '' },
    { label: 'Avg. Monthly',     value: stats.avgMonthly,      sub: 'Past period avg',  icon: TrendingUp,   color: 'green',  trend: 'down', change: '' },
    { label: 'Savings Rate',     value: stats.savingsRate || (summary ? `${summary.savingsRate}%` : 'N/A'), sub: 'of income', icon: AlertTriangle, color: 'red', trend: 'up', change: '' },
  ]

  return (
    <PageShell
      title="Reports & Analytics"
      subtitle="Detailed insights into your financial data"
      headerRight={
        <div className="rep-header-btns">
          <button className="btn btn-outline btn-sm" id="export-pdf-btn"><FileText size={13} /> Export PDF</button>
          <button className="btn btn-outline btn-sm" id="export-csv-btn"><Table2 size={13} /> Export CSV</button>
          <button className="btn btn-teal btn-sm" id="export-excel-btn"><Download size={13} /> Export Excel</button>
        </div>
      }
    >
      {/* ── Period selector ── */}
      <div className="rep-period-bar card">
        <span className="rep-period-label">Time Period:</span>
        <div className="rep-period-tabs">
          {PERIODS.map(p => (
            <button
              key={p}
              id={`period-${p.replace(/\s+/g, '-').toLowerCase()}`}
              className={`rep-period-tab ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="rep-stats-row">
        {statCards.map((s, i) => {
          const Icon      = s.icon
          const TrendIcon = s.trend === 'down' ? TrendingDown : TrendingUp
          return (
            <div key={i} className="rep-stat-card card">
              <div className={`rep-stat-icon rep-icon-${s.color}`}><Icon size={17} /></div>
              <div className="rep-stat-body">
                <div className="rep-stat-label">{s.label}</div>
                <div className="rep-stat-value">{loading ? '…' : s.value}</div>
                <div className="rep-stat-change change-good">
                  <TrendIcon size={11} /> {s.sub}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="rep-loading-overlay">
          <Loader2 size={28} className="spin" />
          <span>Generating report…</span>
        </div>
      )}

      {/* ── Income vs Expenses Bar Chart ── */}
      <div className="card rep-chart-card" id="income-expenses-chart">
        <div className="rep-chart-header">
          <div>
            <h3 className="rep-chart-title">Income vs Expenses</h3>
            <p className="rep-chart-sub">Monthly comparison for {period}</p>
          </div>
        </div>
        <div className="rep-chart-wrap rep-chart-tall">
          <Bar data={barData} options={barOpts} />
        </div>
      </div>

      {/* ── Bottom row: Donut + Line ── */}
      <div className="rep-bottom-row">
        <div className="card rep-chart-card" id="category-breakdown-chart">
          <div className="rep-chart-header">
            <div>
              <h3 className="rep-chart-title">Category Breakdown</h3>
              <p className="rep-chart-sub">Spending distribution</p>
            </div>
          </div>
          <div className="rep-donut-layout">
            <div className="rep-chart-wrap rep-chart-donut">
              <Doughnut data={donutData} options={doughnutOpts} />
            </div>
            <div className="rep-donut-legend">
              {catBreakdown.map(c => (
                <div key={c.label} className="rep-legend-item">
                  <div className="rep-legend-dot" style={{ background: c.color }} />
                  <span className="rep-legend-label">{c.label}</span>
                  <span className="rep-legend-pct">{c.percent}%</span>
                  <span className="rep-legend-val">{formatCurrency(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card rep-chart-card" id="weekly-trend-chart">
          <div className="rep-chart-header">
            <div>
              <h3 className="rep-chart-title">Weekly Spending Trend</h3>
              <p className="rep-chart-sub">This month vs last month</p>
            </div>
          </div>
          <div className="rep-chart-wrap rep-chart-medium">
            <Line data={trendData} options={lineOpts} />
          </div>
        </div>
      </div>

      {/* ── Summary Card ── */}
      <div className="rep-summary-card card" id="ai-summary-section">
        <div className="rep-summary-header">
          <BarChart3 size={18} className="rep-summary-icon" />
          <h3 className="rep-chart-title">Financial Summary</h3>
        </div>
        <div className="rep-summary-grid">
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Total Spending</div>
            <div className="rep-summary-val rep-val-spend">
              {loading ? '…' : summary ? formatCurrency(summary.totalSpending) : formatCurrency(0)}
            </div>
            <div className="rep-summary-note">Period total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Total Income</div>
            <div className="rep-summary-val rep-val-income">
              {loading ? '…' : summary ? formatCurrency(summary.totalIncome) : formatCurrency(0)}
            </div>
            <div className="rep-summary-note">Period total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Net Savings</div>
            <div className="rep-summary-val rep-val-save">
              {loading ? '…' : summary ? formatCurrency(summary.netSavings) : formatCurrency(0)}
            </div>
            <div className="rep-summary-note">Period total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Savings Rate</div>
            <div className="rep-summary-val rep-val-rate">
              {loading ? '…' : summary ? `${summary.savingsRate}%` : '0%'}
            </div>
            <div className="rep-summary-note">of income</div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
