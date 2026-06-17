import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'
import { useCurrency } from '../../../contexts/CurrencyContext'
import './RecentTransactions.css'

// Category icon glyphs using emoji-safe SVG paths
const categoryIcons = {
  food:          { bg: '#f0fdfa', color: '#14b8a6', symbol: '🍽' },
  income:        { bg: '#f0fdf4', color: '#22c55e', symbol: '💳' },
  utilities:     { bg: '#eef2ff', color: '#6366f1', symbol: '⚡' },
  shopping:      { bg: '#f0f9ff', color: '#0ea5e9', symbol: '🛍' },
  transport:     { bg: '#fff7ed', color: '#f59e0b', symbol: '🚗' },
  entertainment: { bg: '#fdf4ff', color: '#a855f7', symbol: '🎬' },
}

function statusBadge(status) {
  if (status === 'pending') return <span className="tx-badge pending">Pending</span>
  return null
}

export default function RecentTransactions({ transactions }) {
  const { formatCurrency } = useCurrency()
  return (
    <div className="tx-card" id="section-transactions">
      <div className="tx-card-header">
        <div>
          <h3 className="tx-card-title">Recent Transactions</h3>
          <p className="tx-card-subtitle">{transactions.length} transactions this month</p>
        </div>
        <button className="btn btn-outline btn-sm" id="tx-view-all">
          View All
        </button>
      </div>

      <div className="tx-list">
        {transactions.map(tx => {
          const isIncome = tx.amount > 0
          const iconMeta = categoryIcons[tx.icon] || categoryIcons.food

          return (
            <div key={tx.id} className="tx-row" id={`tx-${tx.id}`}>
              {/* Icon */}
              <div
                className="tx-icon"
                style={{ background: iconMeta.bg }}
                aria-hidden="true"
              >
                <span className="tx-icon-glyph">{iconMeta.symbol}</span>
              </div>

              {/* Info */}
              <div className="tx-info">
                <div className="tx-name-row">
                  <span className="tx-name">{tx.name}</span>
                  {statusBadge(tx.status)}
                </div>
                <div className="tx-meta">
                  <span className="tx-category">{tx.category}</span>
                  <span className="tx-dot" aria-hidden="true">·</span>
                  <span className="tx-date">
                    {tx.status === 'pending' && <Clock size={10} className="tx-pending-icon" />}
                    {tx.date}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className={`tx-amount ${isIncome ? 'income' : 'expense'}`}>
                {isIncome
                  ? <ArrowUpRight size={13} className="tx-arrow" />
                  : <ArrowDownRight size={13} className="tx-arrow" />
                }
                {isIncome ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
