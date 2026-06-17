import { useRef } from 'react'
import { useCurrency } from '../../../contexts/CurrencyContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import './Charts.css'

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
)

const TEAL   = '#14b8a6'
const INDIGO = '#6366f1'

export default function IncomeExpensesChart({ data }) {
  const { currencySymbol } = useCurrency()
  const { labels, income, expenses } = data

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        borderColor: TEAL,
        backgroundColor: 'rgba(20, 184, 166, 0.08)',
        pointBackgroundColor: TEAL,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenses,
        borderColor: INDIGO,
        backgroundColor: 'rgba(99, 102, 241, 0.06)',
        pointBackgroundColor: INDIGO,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 3,
          useBorderRadius: true,
          font: { size: 12, family: 'Inter', weight: '500' },
          color: '#64748b',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#94a3b8',
        bodyColor: '#ffffff',
        borderColor: '#1e293b',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 11, family: 'Inter', weight: '500' },
        bodyFont: { size: 13, family: 'Inter', weight: '600' },
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${currencySymbol}${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { size: 12, family: 'Inter', weight: '500' },
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(241, 245, 249, 1)',
          drawBorder: false,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          font: { size: 11, family: 'Inter' },
          color: '#94a3b8',
          callback: val => `${currencySymbol}${(val / 1000).toFixed(0)}k`,
          maxTicksLimit: 6,
        },
      },
    },
  }

  return (
    <div className="chart-card" id="chart-income-expenses">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Income vs Expenses</h3>
          <p className="chart-subtitle">6-month comparison</p>
        </div>
        <select className="chart-period-select" aria-label="Select period" id="chart-period">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>
      <div className="chart-body" style={{ height: 240 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
