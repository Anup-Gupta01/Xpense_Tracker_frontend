import { useState } from 'react'
import {
  Download, FileText, Table2, BarChart3,
  TrendingUp, TrendingDown, DollarSign, AlertTriangle,
  ChevronDown,
} from 'lucide-react'
import {
  Chart,
  BarElement, LineElement, ArcElement,
  CategoryScale, LinearScale, PointElement,
  Tooltip, Legend, Filler,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import PageShell from '../components/Dashboard/PageShell/PageShell'
import {
  monthlySpendingData,
  categoryBreakdownData,
  weeklyTrendData,
  reportStats,
} from '../data/expensesMockData'
import './ReportsPage.css'

Chart.register(
  BarElement, LineElement, ArcElement,
  CategoryScale, LinearScale, PointElement,
  Tooltip, Legend, Filler,
)

// ── Chart defaults ────────────────────────────────────────────────────────────
const CHART_FONT = "'Inter', system-ui, sans-serif"

const barOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: { font: { family: CHART_FONT, size: 12 }, color: '#475569', boxWidth: 12, padding: 16 },
    },
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
    legend: {
      position: 'top',
      labels: { font: { family: CHART_FONT, size: 12 }, color: '#475569', boxWidth: 12, padding: 16 },
    },
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

// ── Chart data ────────────────────────────────────────────────────────────────
const barData = {
  labels: monthlySpendingData.labels,
  datasets: [
    {
      label: 'Income',
      data: monthlySpendingData.income,
      backgroundColor: 'rgba(99, 102, 241, 0.85)',
      borderRadius: 5,
      barPercentage: 0.55,
    },
    {
      label: 'Expenses',
      data: monthlySpendingData.expenses,
      backgroundColor: 'rgba(20, 184, 166, 0.85)',
      borderRadius: 5,
      barPercentage: 0.55,
    },
    {
      label: 'Savings',
      data: monthlySpendingData.savings,
      backgroundColor: 'rgba(245, 158, 11, 0.75)',
      borderRadius: 5,
      barPercentage: 0.55,
    },
  ],
}

const trendData = {
  labels: weeklyTrendData.labels,
  datasets: [
    {
      label: 'This Month',
      data: weeklyTrendData.thisMonth,
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20,184,166,0.08)',
      borderWidth: 2.5,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#14b8a6',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Last Month',
      data: weeklyTrendData.lastMonth,
      borderColor: '#94a3b8',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: [6, 3],
      tension: 0.4,
      pointBackgroundColor: '#94a3b8',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

const donutData = {
  labels: categoryBreakdownData.map(c => c.label),
  datasets: [{
    data: categoryBreakdownData.map(c => c.value),
    backgroundColor: categoryBreakdownData.map(c => c.color),
    borderWidth: 0,
    hoverOffset: 6,
  }],
}

const PERIODS = ['Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year']

// ── Component ──────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [period, setPeriod] = useState('Last 6 Months')

  const stats = [
    {
      label: 'Total Spent',
      value: reportStats.totalSpent,
      sub: 'This period',
      icon: DollarSign,
      color: 'teal',
      trend: 'down',
      change: '-8.3%',
    },
    {
      label: 'Highest Category',
      value: reportStats.highestCategory,
      sub: '22.7% of total',
      icon: BarChart3,
      color: 'indigo',
      trend: 'up',
      change: '+12.1%',
    },
    {
      label: 'Over Budget',
      value: reportStats.overBudget,
      sub: '2 categories',
      icon: AlertTriangle,
      color: 'red',
      trend: 'up',
      change: '+2',
    },
    {
      label: 'Avg. Monthly',
      value: reportStats.avgMonthly,
      sub: 'Past 6 months',
      icon: TrendingUp,
      color: 'green',
      trend: 'down',
      change: '-4.2%',
    },
  ]

  return (
    <PageShell
      title="Reports & Analytics"
      subtitle="Detailed insights into your financial data"
      headerRight={
        <div className="rep-header-btns">
          <button className="btn btn-outline btn-sm" id="export-pdf-btn">
            <FileText size={13} />
            Export PDF
          </button>
          <button className="btn btn-outline btn-sm" id="export-csv-btn">
            <Table2 size={13} />
            Export CSV
          </button>
          <button className="btn btn-teal btn-sm" id="export-excel-btn">
            <Download size={13} />
            Export Excel
          </button>
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
        {stats.map((s, i) => {
          const Icon = s.icon
          const TrendIcon = s.trend === 'down' ? TrendingDown : TrendingUp
          return (
            <div key={i} className="rep-stat-card card">
              <div className={`rep-stat-icon rep-icon-${s.color}`}>
                <Icon size={17} />
              </div>
              <div className="rep-stat-body">
                <div className="rep-stat-label">{s.label}</div>
                <div className="rep-stat-value">{s.value}</div>
                <div className={`rep-stat-change ${s.trend === 'up' && s.color === 'red' ? 'change-bad' : 'change-good'}`}>
                  <TrendIcon size={11} />
                  {s.change} vs last period
                </div>
              </div>
            </div>
          )
        })}
      </div>

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
        {/* Category Breakdown */}
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
              {categoryBreakdownData.map(c => (
                <div key={c.label} className="rep-legend-item">
                  <div className="rep-legend-dot" style={{ background: c.color }} />
                  <span className="rep-legend-label">{c.label}</span>
                  <span className="rep-legend-pct">{c.percent}%</span>
                  <span className="rep-legend-val">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
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
          <div className="rep-trend-footer">
            <div className="rep-trend-stat">
              <span className="rep-trend-key">Weekly average</span>
              <span className="rep-trend-num">$1,310</span>
            </div>
            <div className="rep-trend-stat">
              <span className="rep-trend-key">Peak week</span>
              <span className="rep-trend-num rep-trend-peak">Week 2 · $1,450</span>
            </div>
            <div className="rep-trend-stat">
              <span className="rep-trend-key">vs. last month avg</span>
              <span className="rep-trend-num rep-trend-up">+9.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Summary ── */}
      <div className="rep-summary-card card" id="ai-summary-section">
        <div className="rep-summary-header">
          <BarChart3 size={18} className="rep-summary-icon" />
          <h3 className="rep-chart-title">AI Summary</h3>
        </div>
        <div className="rep-summary-grid">
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Total Spending</div>
            <div className="rep-summary-val rep-val-spend">$63,512</div>
            <div className="rep-summary-note">YTD total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Total Income</div>
            <div className="rep-summary-val rep-val-income">$101,160</div>
            <div className="rep-summary-note">YTD total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Net Savings</div>
            <div className="rep-summary-val rep-val-save">$15,990</div>
            <div className="rep-summary-note">YTD total</div>
          </div>
          <div className="rep-summary-stat">
            <div className="rep-summary-label">Savings Rate</div>
            <div className="rep-summary-val rep-val-rate">19.4%</div>
            <div className="rep-summary-note">of income</div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
