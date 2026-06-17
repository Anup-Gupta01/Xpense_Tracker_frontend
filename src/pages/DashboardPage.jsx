import { useState, useEffect, useCallback } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Sidebar             from '../components/Dashboard/Sidebar/Sidebar'
import DashboardHeader     from '../components/Dashboard/Header/DashboardHeader'
import SummaryCards        from '../components/Dashboard/SummaryCards/SummaryCards'
import IncomeExpensesChart from '../components/Dashboard/Charts/IncomeExpensesChart'
import CategoryDonutChart  from '../components/Dashboard/Charts/CategoryDonutChart'
import BudgetProgress      from '../components/Dashboard/BudgetProgress/BudgetProgress'
import RecentTransactions  from '../components/Dashboard/RecentTransactions/RecentTransactions'
import { dashboardAPI, budgetsAPI } from '../services/api'
import { useCurrency } from '../contexts/CurrencyContext'
import {
  summaryCards   as mockSummaryCards,
  lineChartData  as mockLineChartData,
  categoryData   as mockCategoryData,
  budgets        as mockBudgets,
  recentTransactions as mockTransactions,
} from '../data/mockData'
import './DashboardPage.css'

// ── Transform API data to component shapes ──────────────────────────────────
function buildSummaryCards(summary, formatCurrency) {
  const fmt = (n) => formatCurrency(Math.abs(n))
  return [
    { id: 'balance',  label: 'Total Balance',   value: fmt(summary.totalBalance),  change: '+0%', trend: 'up',   icon: 'wallet',      color: 'teal'   },
    { id: 'income',   label: 'Total Income',    value: fmt(summary.totalIncome),   change: '+0%', trend: 'up',   icon: 'trending-up', color: 'indigo' },
    { id: 'expenses', label: 'Total Expenses',  value: fmt(summary.totalExpenses), change: '+0%', trend: 'down', icon: 'credit-card', color: 'slate'  },
    { id: 'savings',  label: 'Savings',         value: fmt(summary.savings),       change: '+0%', trend: summary.savings >= 0 ? 'up' : 'down', icon: 'piggy-bank', color: 'teal' },
  ]
}

// Slim down budgets from full API shape to what BudgetProgress needs
function buildBudgetProgress(apibudgets) {
  return apibudgets.map(b => ({
    id:       b.id,
    category: b.category,
    spent:    b.spent,
    limit:    b.limit,
    color:    b.color,
  }))
}

export default function DashboardPage() {
  const { formatCurrency } = useCurrency()
  const [summaryCards,       setSummaryCards]       = useState(mockSummaryCards)
  const [lineChartData,      setLineChartData]      = useState(mockLineChartData)
  const [categoryData,       setCategoryData]       = useState(mockCategoryData)
  const [budgets,            setBudgets]            = useState(mockBudgets)
  const [recentTransactions, setRecentTransactions] = useState(mockTransactions)

  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [summaryRes, chartRes, catRes, txRes, budgetRes] = await Promise.all([
        dashboardAPI.getSummary(),
        dashboardAPI.getChartData(),
        dashboardAPI.getCategories(),
        dashboardAPI.getTransactions(),
        budgetsAPI.getAll(),
      ])

      setSummaryCards(buildSummaryCards(summaryRes.data.data, formatCurrency))
      setLineChartData(chartRes.data.data)
      setCategoryData(catRes.data.data)
      setRecentTransactions(txRes.data.data)

      // Only replace budgets if API returned data
      const apiBudgets = budgetRes.data.data
      if (apiBudgets && apiBudgets.length > 0) {
        setBudgets(buildBudgetProgress(apiBudgets))
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Could not load dashboard data. Showing sample data.')
      // Keep mock data on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader />

        {/* Error banner */}
        {error && (
          <div className="dash-error-banner">
            <AlertCircle size={15} />
            <span>{error}</span>
            <button className="dash-retry-btn" onClick={fetchAll}>
              <RefreshCw size={13} /> Retry
            </button>
          </div>
        )}

        <div className={`dashboard-content${loading ? ' dash-loading' : ''}`}>
          {/* ── Summary Cards ── */}
          <section className="dash-section" aria-label="Financial summary">
            <SummaryCards cards={summaryCards} loading={loading} />
          </section>

          {/* ── Charts row ── */}
          <section className="dash-section dash-charts-row" aria-label="Charts">
            <IncomeExpensesChart data={lineChartData} />
            <CategoryDonutChart  data={categoryData} />
          </section>

          {/* ── Bottom row: Budget + Transactions ── */}
          <section className="dash-section dash-bottom-row" aria-label="Budget and transactions">
            <BudgetProgress      budgets={budgets} />
            <RecentTransactions  transactions={recentTransactions} />
          </section>
        </div>
      </div>
    </div>
  )
}
