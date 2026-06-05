import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import DashboardHeader from '../components/Dashboard/Header/DashboardHeader'
import SummaryCards from '../components/Dashboard/SummaryCards/SummaryCards'
import IncomeExpensesChart from '../components/Dashboard/Charts/IncomeExpensesChart'
import CategoryDonutChart from '../components/Dashboard/Charts/CategoryDonutChart'
import BudgetProgress from '../components/Dashboard/BudgetProgress/BudgetProgress'
import RecentTransactions from '../components/Dashboard/RecentTransactions/RecentTransactions'
import {
  summaryCards,
  lineChartData,
  categoryData,
  budgets,
  recentTransactions,
} from '../data/mockData'
import './DashboardPage.css'

export default function DashboardPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader />

        <div className="dashboard-content">
          {/* ── Summary Cards ── */}
          <section className="dash-section" aria-label="Financial summary">
            <SummaryCards cards={summaryCards} />
          </section>

          {/* ── Charts row ── */}
          <section className="dash-section dash-charts-row" aria-label="Charts">
            <IncomeExpensesChart data={lineChartData} />
            <CategoryDonutChart data={categoryData} />
          </section>

          {/* ── Bottom row: Budget + Transactions ── */}
          <section className="dash-section dash-bottom-row" aria-label="Budget and transactions">
            <BudgetProgress budgets={budgets} />
            <RecentTransactions transactions={recentTransactions} />
          </section>
        </div>
      </div>
    </div>
  )
}
