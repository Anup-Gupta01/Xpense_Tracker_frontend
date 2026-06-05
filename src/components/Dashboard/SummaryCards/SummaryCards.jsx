import { Wallet, TrendingUp, CreditCard, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import './SummaryCards.css'

const iconMap = {
  wallet:      Wallet,
  'trending-up': TrendingUp,
  'credit-card': CreditCard,
  'piggy-bank':  PiggyBank,
}

const colorMap = {
  teal:   { icon: 'card-icon-teal',   value: 'card-value-teal'   },
  indigo: { icon: 'card-icon-indigo', value: 'card-value-default' },
  slate:  { icon: 'card-icon-slate',  value: 'card-value-default' },
}

export default function SummaryCards({ cards }) {
  return (
    <div className="summary-cards-grid">
      {cards.map(({ id, label, value, change, trend, icon, color }) => {
        const Icon = iconMap[icon]
        const colors = colorMap[color] || colorMap.slate
        const isUp = trend === 'up'

        return (
          <div key={id} className="summary-card" id={`card-${id}`}>
            <div className="summary-card-top">
              <div className="summary-card-label">{label}</div>
              <div className={`summary-card-icon-wrap ${colors.icon}`}>
                {Icon && <Icon size={16} />}
              </div>
            </div>
            <div className={`summary-card-value ${colors.value}`}>{value}</div>
            <div className={`summary-card-change ${isUp ? 'change-up' : 'change-down'}`}>
              {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              <span>{change} vs last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
