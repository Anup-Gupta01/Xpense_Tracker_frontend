import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Search, Filter, Download,
  Pencil, Trash2, X, Check, AlertCircle,
  ChevronDown, Loader2, RefreshCw,
} from 'lucide-react'
import PageShell from '../components/Dashboard/PageShell/PageShell'
import { expensesAPI } from '../services/api'
import './ExpensesPage.css'

// ── Helpers ─────────────────────────────────────────────────────────────────
const CATEGORIES     = ['All', 'Food & Dining', 'Transportation', 'Shopping', 'Utilities', 'Entertainment', 'Health & Fitness']
const STATUSES       = ['All', 'completed', 'pending', 'failed']
const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'PayPal']

const EMPTY_FORM = {
  description: '',
  category: 'Food & Dining',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  paymentMethod: 'Credit Card',
  status: 'completed',
}

function statusBadge(status) {
  const map = { completed: 'badge-status completed', pending: 'badge-status pending', failed: 'badge-status failed' }
  return map[status] ?? 'badge-status'
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ExpensesPage() {
  const [expenses,     setExpenses]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [saving,       setSaving]       = useState(false)
  const [error,        setError]        = useState('')
  const [search,       setSearch]       = useState('')
  const [catFilter,    setCat]          = useState('All')
  const [statusFilter, setStatus]       = useState('All')

  // Modal state
  const [modal,    setModal]    = useState(null)
  const [editId,   setEditId]   = useState(null)
  const [form,     setForm]     = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)
  const [errors,   setErrors]   = useState({})

  // ── Fetch from API ─────────────────────────────────────────────────────────
  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (catFilter !== 'All')    params.category = catFilter
      if (statusFilter !== 'All') params.status   = statusFilter
      if (search)                 params.search   = search
      const { data } = await expensesAPI.getAll(params)
      setExpenses(data.data)
    } catch (err) {
      setError('Failed to load expenses. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [catFilter, statusFilter, search])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  // ── Filtering (client-side search fallback when params not used) ───────────
  const filtered = expenses

  // ── Form handlers ─────────────────────────────────────────────────────────
  function openAdd() {
    setForm(EMPTY_FORM)
    setErrors({})
    setEditId(null)
    setModal('add')
  }

  function openEdit(expense) {
    setForm({
      description:   expense.description,
      category:      expense.category,
      amount:        String(expense.amount),
      date:          expense.date,
      paymentMethod: expense.paymentMethod,
      status:        expense.status,
    })
    setErrors({})
    setEditId(expense.id)
    setModal('edit')
  }

  function validate() {
    const e = {}
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  async function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setSaving(true)
    try {
      const payload = {
        description:   form.description.trim(),
        category:      form.category,
        amount:        parseFloat(form.amount),
        date:          form.date,
        paymentMethod: form.paymentMethod,
        status:        form.status,
      }

      if (modal === 'edit') {
        const { data } = await expensesAPI.update(editId, payload)
        setExpenses(prev => prev.map(ex => ex.id === editId ? data.data : ex))
      } else {
        const { data } = await expensesAPI.create(payload)
        setExpenses(prev => [data.data, ...prev])
      }
      setModal(null)
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Failed to save expense.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await expensesAPI.delete(id)
      setExpenses(prev => prev.filter(e => e.id !== id))
      setDeleteId(null)
    } catch (err) {
      setError('Failed to delete expense.')
      setDeleteId(null)
    }
  }

  const total = filtered.reduce((s, e) => s + e.amount, 0)

  return (
    <PageShell
      title="Expenses"
      subtitle="Track and manage all your expenses"
      headerRight={
        <button className="btn btn-teal btn-sm" id="expenses-add-btn" onClick={openAdd}>
          <Plus size={14} />
          Add Expense
        </button>
      }
    >
      {/* Error banner */}
      {error && (
        <div className="exp-error-banner" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
          <button className="exp-retry-btn" onClick={fetchExpenses}>
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="exp-toolbar card">
        <div className="exp-search-wrap">
          <Search size={15} className="exp-search-icon" />
          <input
            id="expenses-search"
            type="text"
            className="exp-search-input"
            placeholder="Search expenses…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search expenses"
          />
          {search && (
            <button className="exp-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
              <X size={13} />
            </button>
          )}
        </div>

        <div className="exp-filters">
          <div className="exp-filter-group">
            <Filter size={13} />
            <select
              id="expenses-category-filter"
              className="exp-select"
              value={catFilter}
              onChange={e => setCat(e.target.value)}
              aria-label="Filter by category"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} className="exp-select-arrow" />
          </div>

          <div className="exp-filter-group">
            <select
              id="expenses-status-filter"
              className="exp-select"
              value={statusFilter}
              onChange={e => setStatus(e.target.value)}
              aria-label="Filter by status"
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <ChevronDown size={13} className="exp-select-arrow" />
          </div>

          <button className="btn btn-outline btn-sm" id="expenses-export-btn">
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card exp-table-card">
        <div className="exp-table-meta">
          <span className="exp-table-count">
            {loading ? 'Loading…' : `${filtered.length} expenses`}
          </span>
          {!loading && (
            <span className="exp-table-total">
              Total: <strong>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </span>
          )}
        </div>

        <div className="exp-table-wrap">
          <table className="exp-table" id="expenses-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="exp-empty">
                    <Loader2 size={18} className="spin" />
                    <span>Loading expenses…</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="exp-empty">
                    <AlertCircle size={20} />
                    <span>No expenses found</span>
                  </td>
                </tr>
              ) : (
                filtered.map(exp => (
                  <tr key={exp.id} className="exp-row">
                    <td className="exp-td-desc">{exp.description}</td>
                    <td><span className="exp-category-tag">{exp.category}</span></td>
                    <td className="exp-td-amount">
                      ${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="exp-td-date">{exp.date}</td>
                    <td className="exp-td-method">{exp.paymentMethod}</td>
                    <td>
                      <span className={statusBadge(exp.status)}>
                        {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
                      </span>
                    </td>
                    <td className="exp-td-actions">
                      <button
                        className="exp-action-btn edit"
                        onClick={() => openEdit(exp)}
                        aria-label={`Edit ${exp.description}`}
                        id={`edit-expense-${exp.id}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="exp-action-btn delete"
                        onClick={() => setDeleteId(exp.id)}
                        aria-label={`Delete ${exp.description}`}
                        id={`delete-expense-${exp.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={modal === 'add' ? 'Add Expense' : 'Edit Expense'}>
          <div className="modal-box" id="expense-modal">
            <div className="modal-header">
              <h2 className="modal-title">{modal === 'add' ? 'Add New Expense' : 'Edit Expense'}</h2>
              <button className="modal-close" onClick={() => setModal(null)} aria-label="Close modal" id="modal-close-btn">
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

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <input
                    id="modal-description"
                    className={`form-input${errors.description ? ' error' : ''}`}
                    placeholder="e.g. Grocery Store"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  />
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Amount (USD) *</label>
                  <input
                    id="modal-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className={`form-input${errors.amount ? ' error' : ''}`}
                    placeholder="0.00"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  />
                  {errors.amount && <span className="form-error">{errors.amount}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <div className="form-select-wrap">
                    <select
                      id="modal-category"
                      className="form-input form-select"
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    >
                      {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="form-select-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    id="modal-date"
                    type="date"
                    className={`form-input${errors.date ? ' error' : ''}`}
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                  {errors.date && <span className="form-error">{errors.date}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div className="form-select-wrap">
                    <select
                      id="modal-payment"
                      className="form-input form-select"
                      value={form.paymentMethod}
                      onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                    >
                      {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={14} className="form-select-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="form-select-wrap">
                    <select
                      id="modal-status"
                      className="form-input form-select"
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    >
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                    <ChevronDown size={14} className="form-select-icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" id="modal-cancel-btn" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-teal" id="modal-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? <><Loader2 size={14} className="spin" /> Saving…</> : <><Check size={14} /> {modal === 'add' ? 'Add Expense' : 'Save Changes'}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="modal-box modal-sm" id="delete-confirm-modal">
            <div className="modal-header">
              <h2 className="modal-title">Delete Expense</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)} id="delete-modal-close">
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-confirm-text">
                Are you sure you want to delete <strong>{expenses.find(e => e.id === deleteId)?.description}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleteId(null)} id="delete-cancel-btn">Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)} id="delete-confirm-btn">
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
