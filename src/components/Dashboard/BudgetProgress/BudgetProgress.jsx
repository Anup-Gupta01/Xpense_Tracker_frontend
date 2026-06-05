import './BudgetProgress.css'

function formatAmount(n) {
  return `$${n.toLocaleString()}`
}

function BudgetBar({ category, spent, limit, color, id }) {
  const pct = Math.min((spent / limit) * 100, 100)
  const isWarning = pct >= 80 && pct < 100
  const isOver    = pct >= 100

  return (
    <div className="budget-row" id={`budget-${id}`}>
      <div className="budget-row-top">
        <div className="budget-category-wrap">
          <span
            className="budget-dot"
            style={{ background: color }}
            aria-hidden="true"
          />
          <span className="budget-category">{category}</span>
        </div>
        <div className="budget-amounts">
          <span className="budget-spent">{formatAmount(spent)}</span>
          <span className="budget-sep">/</span>
          <span className="budget-limit">{formatAmount(limit)}</span>
        </div>
      </div>

      <div className="budget-track">
        <div
          className={`budget-fill ${isWarning ? 'warning' : ''} ${isOver ? 'over' : ''}`}
          style={{ width: `${pct}%`, background: isOver ? 'var(--error)' : isWarning ? 'var(--warning)' : color }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="budget-footer">
        <span className={`budget-status ${isOver ? 'status-over' : isWarning ? 'status-warn' : 'status-ok'}`}>
          {isOver ? 'Over budget' : isWarning ? 'Near limit' : `${formatAmount(limit - spent)} remaining`}
        </span>
        <span className="budget-pct">{Math.round(pct)}%</span>
      </div>
    </div>
  )
}

export default function BudgetProgress({ budgets }) {
  return (
    <div className="budget-card" id="section-budget">
      <div className="budget-card-header">
        <div>
          <h3 className="budget-card-title">Budget Progress</h3>
          <p className="budget-card-subtitle">June 2026 spending limits</p>
        </div>
        <button className="btn btn-outline btn-sm" id="budget-manage">
          Manage
        </button>
      </div>

      <div className="budget-list">
        {budgets.map(b => (
          <BudgetBar key={b.id} {...b} />
        ))}
      </div>
    </div>
  )
}
