import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, X, Check, ChevronDown,
  Utensils, Car, ShoppingBag, Zap, Tv, Heart,
  AlertTriangle, TrendingUp, DollarSign, PiggyBank,
  Loader2, AlertCircle, RefreshCw,
} from 'lucide-react'
import PageShell  from '../components/Dashboard/PageShell/PageShell'
import { budgetsAPI } from '../services/api'
import './BudgetsPage.css'

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  utensils:      Utensils,
  car:           Car,
  'shopping-bag': ShoppingBag,
  zap:           Zap,
  tv:            Tv,
  heart:         Heart,
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const CATEGORY_OPTIONS = [
  { label: 'Food & Dining',    icon: 'utensils',     color: '#14b8a6', colorBg: 'rgba(20,184,166,0.1)' },
  { label: 'Transportation',   icon: 'car',          color: '#6366f1', colorBg: 'rgba(99,102,241,0.1)' },
  { label: 'Shopping',         icon: 'shopping-bag', color: '#0ea5e9', colorBg: 'rgba(14,165,233,0.1)' },
  { label: 'Utilities',        icon: 'zap',          color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.1)' },
  { label: 'Entertainment',    icon: 'tv',           color: '#f59e0b', colorBg: 'rgba(245,158,11,0.1)' },
  { label: 'Health & Fitness', icon: 'heart',        color: '#22c55e', colorBg: 'rgba(34,197,94,0.1)'  },
]

const currentPeriod = () => {
  const d = new Date()
  return d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear()
}

const EMPTY_FORM = { category: 'Food & Dining', limit: '', period: currentPeriod() }

function pct(spent, limit) {
  return Math.min(Math.round((spent / limit) * 100), 100)
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function BudgetsPage() {
  const [budgets,  setBudgets]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [modal,    setModal]    = useState(null)
  const [editId,   setEditId]   = useState(null)
  const [form,     setForm]     = useState(EMPTY_FORM)
  const [errors,   setErrors]   = useState({})
  const [deleteId, setDeleteId] = useState(null)

  // ── Fetch budgets ──────────────────────────────────────────────────────────
  const fetchBudgets = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await budgetsAPI.getAll()
      setBudgets(data.data)
    } catch (err) {
      setError('Failed to load budgets. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBudgets() }, [fetchBudgets])

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent  = budgets.reduce((s, b) => s + b.spent, 0)
  const remaining   = totalBudget - totalSpent

  function openAdd() {
    setForm(EMPTY_FORM)
    setErrors({})
    setEditId(null)
    setModal('add')
  }

  function openEdit(budget) {
    setForm({ category: budget.category, limit: String(budget.limit), period: budget.period })
    setErrors({})
    setEditId(budget.id)
    setModal('edit')
  }

  function validate() {
    const e = {}
    if (!form.limit || isNaN(Number(form.limit)) || Number(form.limit) <= 0)
      e.limit = 'Enter a valid budget amount'
    return e
  }

  async function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setSaving(true)
    try {
      const payload = {
        category:    form.category,
        limitAmount: parseFloat(form.limit),
        period:      form.period || currentPeriod(),
      }

      if (modal === 'edit') {
        const { data } = await budgetsAPI.update(editId, payload)
        setBudgets(prev => prev.map(b => b.id === editId ? data.data : b))
      } else {
        const { data } = await budgetsAPI.create(payload)
        setBudgets(prev => [...prev, data.data])
      }
      setModal(null)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save budget.'
      setErrors({ api: msg })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await budgetsAPI.delete(id)
      setBudgets(prev => prev.filter(b => b.id !== id))
      setDeleteId(null)
    } catch (err) {
      setError('Failed to delete budget.')
      setDeleteId(null)
    }
  }

  return (
    <PageShell
      title="Budgets"
      subtitle="Manage your spending limits by category"
      headerRight={
        <button className="btn btn-teal btn-sm" onClick={openAdd} id="budgets-create-btn">
          <Plus size={14} />
          Create Budget
        </button>
      }
    >
      {error && (
        <div className="exp-error-banner" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
          <button className="exp-retry-btn" onClick={fetchBudgets}>
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* ── Summary Cards ── */}
      <div className="bud-summary-row">
        <div className="bud-summary-card card">
          <div className="bud-summary-icon bud-icon-teal"><DollarSign size={18} /></div>
          <div>
            <div className="bud-summary-label">Total Budget</div>
            <div className="bud-summary-value">
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="bud-summary-sub">across {budgets.length} categories</div>
          </div>
        </div>

        <div className="bud-summary-card card">
          <div className="bud-summary-icon bud-icon-indigo"><TrendingUp size={18} /></div>
          <div>
            <div className="bud-summary-label">Total Spent</div>
            <div className="bud-summary-value bud-value-spent">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`bud-summary-sub ${totalSpent > totalBudget ? 'bud-sub-over' : ''}`}>
              {totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of total budget
            </div>
          </div>
        </div>

        <div className={`bud-summary-card card ${remaining < 0 ? 'bud-card-danger' : ''}`}>
          <div className={`bud-summary-icon ${remaining < 0 ? 'bud-icon-red' : 'bud-icon-green'}`}>
            <PiggyBank size={18} />
          </div>
          <div>
            <div className="bud-summary-label">Remaining</div>
            <div className={`bud-summary-value ${remaining < 0 ? 'bud-value-danger' : 'bud-value-ok'}`}>
              ${Math.abs(remaining).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`bud-summary-sub ${remaining < 0 ? 'bud-sub-over' : ''}`}>
              {remaining < 0 ? `$${Math.abs(remaining).toFixed(2)} over budget` : 'available to spend'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Budget Cards Grid ── */}
      {loading ? (
        <div className="bud-loading-state">
          <Loader2 size={24} className="spin" />
          <span>Loading budgets…</span>
        </div>
      ) : budgets.length === 0 ? (
        <div className="bud-empty-state">
          <PiggyBank size={40} />
          <p>No budgets yet. Create your first budget to start tracking!</p>
          <button className="btn btn-teal btn-sm" onClick={openAdd}>
            <Plus size={14} /> Create Budget
          </button>
        </div>
      ) : (
        <div className="bud-grid" id="budgets-grid">
          {budgets.map(budget => {
            const p      = pct(budget.spent, budget.limit)
            const isOver = budget.spent > budget.limit
            const isWarn = !isOver && p >= 80

            const IconComp = ICON_MAP[budget.icon] ?? DollarSign

            return (
              <div key={budget.id} className={`bud-card card ${isOver ? 'bud-card-over' : ''}`} id={`budget-${budget.id}`}>
                <div className="bud-card-header">
                  <div className="bud-cat-info">
                    <div className="bud-cat-icon" style={{ background: budget.colorBg, color: budget.color }}>
                      <IconComp size={16} />
                    </div>
                    <div>
                      <div className="bud-cat-name">{budget.category}</div>
                      <div className="bud-cat-sub">{budget.transactions} transactions · {budget.period}</div>
                    </div>
                  </div>

                  <div className="bud-card-actions">
                    {isOver && <span className="bud-warn-badge"><AlertTriangle size={11} /> Over Budget</span>}
                    {isWarn && !isOver && <span className="bud-warn-badge bud-warn-yellow"><AlertTriangle size={11} /> Near Limit</span>}
                    <div className="bud-pct-pill" style={{ color: isOver ? 'var(--error)' : budget.color }}>
                      {p}%
                    </div>
                  </div>
                </div>

                <div className="bud-amounts">
                  <div>
                    <div className="bud-spent-label">Spent</div>
                    <div className="bud-spent-val" style={{ color: isOver ? 'var(--error)' : 'var(--navy-900)' }}>
                      ${budget.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bud-amounts-right">
                    <div className="bud-spent-label">Budget</div>
                    <div className="bud-limit-val">
                      ${budget.limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="bud-progress-wrap" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="bud-progress-fill"
                    style={{ width: `${p}%`, background: isOver ? 'var(--error)' : isWarn ? '#f59e0b' : budget.color }}
                  />
                </div>

                <div className="bud-card-footer">
                  <div className="bud-remaining-text">
                    {isOver
                      ? <span className="bud-over-text">${(budget.spent - budget.limit).toFixed(2)} over limit</span>
                      : <span>${(budget.limit - budget.spent).toFixed(2)} remaining</span>
                    }
                  </div>
                  <div className="bud-card-btns">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEdit(budget)}
                      id={`edit-budget-${budget.id}`}
                      aria-label={`Edit ${budget.category} budget`}
                    >
                      <Pencil size={12} />
                      Edit Budget
                    </button>
                    <button
                      className="bud-delete-btn"
                      onClick={() => setDeleteId(budget.id)}
                      id={`delete-budget-${budget.id}`}
                      aria-label={`Delete ${budget.category} budget`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box" id="budget-modal">
            <div className="modal-header">
              <h2 className="modal-title">{modal === 'add' ? 'Create Budget' : 'Edit Budget'}</h2>
              <button className="modal-close" onClick={() => setModal(null)} id="budget-modal-close">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {errors.api && (
                <div className="form-api-error">
                  <AlertCircle size={14} />
                  {errors.api}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="form-select-wrap">
                  <select
                    id="budget-modal-category"
                    className="form-input form-select"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    disabled={modal === 'edit'}
                  >
                    {CATEGORY_OPTIONS.map(c => <option key={c.label}>{c.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="form-select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Budget (USD) *</label>
                <input
                  id="budget-modal-limit"
                  type="number"
                  min="0"
                  step="0.01"
                  className={`form-input${errors.limit ? ' error' : ''}`}
                  placeholder="0.00"
                  value={form.limit}
                  onChange={e => setForm(f => ({ ...f, limit: e.target.value }))}
                />
                {errors.limit && <span className="form-error">{errors.limit}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Period</label>
                <input
                  id="budget-modal-period"
                  className="form-input"
                  placeholder="e.g. Jun 2026"
                  value={form.period}
                  onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModal(null)} id="budget-cancel-btn">Cancel</button>
              <button className="btn btn-teal" onClick={handleSave} id="budget-save-btn" disabled={saving}>
                {saving
                  ? <><Loader2 size={14} className="spin" /> Saving…</>
                  : <><Check size={14} /> {modal === 'add' ? 'Create Budget' : 'Save Changes'}</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box modal-sm" id="budget-delete-modal">
            <div className="modal-header">
              <h2 className="modal-title">Delete Budget</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)} id="budget-delete-close">
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-confirm-text">
                Are you sure you want to delete the <strong>{budgets.find(b => b.id === deleteId)?.category}</strong> budget?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleteId(null)} id="budget-delete-cancel">Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)} id="budget-delete-confirm">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
