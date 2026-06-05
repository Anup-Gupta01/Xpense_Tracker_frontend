import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './Charts.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CategoryDonutChart({ data }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 3,
        hoverOffset: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
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
          label: ctx => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  }

  // Center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { ctx, chartArea: { top, bottom, left, right } } = chart
      const cx = (left + right) / 2
      const cy = (top + bottom) / 2
      ctx.save()
      ctx.font = '700 20px "Plus Jakarta Sans", Inter, sans-serif'
      ctx.fillStyle = '#0f172a'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('$5,240', cx, cy - 8)
      ctx.font = '500 11px Inter, sans-serif'
      ctx.fillStyle = '#94a3b8'
      ctx.fillText('Total Expenses', cx, cy + 12)
      ctx.restore()
    },
  }

  return (
    <div className="chart-card" id="chart-category">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Expense by Category</h3>
          <p className="chart-subtitle">June 2026</p>
        </div>
      </div>

      <div className="donut-layout">
        {/* Chart */}
        <div className="donut-chart-wrap" style={{ height: 196 }}>
          <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
        </div>

        {/* Legend */}
        <ul className="donut-legend">
          {data.map(({ label, value, color }) => (
            <li key={label} className="donut-legend-item">
              <span className="donut-legend-dot" style={{ background: color }} />
              <span className="donut-legend-label">{label}</span>
              <span className="donut-legend-value">{value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
