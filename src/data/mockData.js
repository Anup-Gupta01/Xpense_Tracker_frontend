// ─── Summary Cards ───────────────────────────────────────────────────────────
export const summaryCards = [
  {
    id: 'balance',
    label: 'Total Balance',
    value: '$24,580.00',
    change: '+4.1%',
    trend: 'up',
    icon: 'wallet',
    color: 'teal',
  },
  {
    id: 'income',
    label: 'Total Income',
    value: '$8,430.00',
    change: '+40.1%',
    trend: 'up',
    icon: 'trending-up',
    color: 'indigo',
  },
  {
    id: 'expenses',
    label: 'Total Expenses',
    value: '$5,240.00',
    change: '-1.7%',
    trend: 'down',
    icon: 'credit-card',
    color: 'slate',
  },
  {
    id: 'savings',
    label: 'Savings',
    value: '$3,190.00',
    change: '+4.9%',
    trend: 'up',
    icon: 'piggy-bank',
    color: 'teal',
  },
]

// ─── Line Chart — Income vs Expenses ─────────────────────────────────────────
export const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  income:   [6200, 7100, 6800, 7900, 8100, 8430],
  expenses: [4100, 4600, 4200, 5100, 4800, 5240],
}

// ─── Donut Chart — Expense by Category ───────────────────────────────────────
export const categoryData = [
  { label: 'Food & Dining',   value: 31, color: '#14b8a6' },
  { label: 'Transportation',  value: 18, color: '#6366f1' },
  { label: 'Shopping',        value: 22, color: '#0ea5e9' },
  { label: 'Entertainment',   value: 13, color: '#f59e0b' },
  { label: 'Utilities',       value: 10, color: '#8b5cf6' },
  { label: 'Healthcare',      value: 6,  color: '#22c55e' },
]

// ─── Budget Progress ──────────────────────────────────────────────────────────
export const budgets = [
  { id: 'b1', category: 'Food & Dining',  spent: 1624, limit: 2000, color: '#14b8a6' },
  { id: 'b2', category: 'Transportation', spent: 380,  limit: 600,  color: '#6366f1' },
  { id: 'b3', category: 'Shopping',       spent: 1155, limit: 1500, color: '#0ea5e9' },
  { id: 'b4', category: 'Entertainment',  spent: 620,  limit: 700,  color: '#f59e0b' },
  { id: 'b5', category: 'Utilities',      spent: 490,  limit: 550,  color: '#8b5cf6' },
]

// ─── Recent Transactions ──────────────────────────────────────────────────────
export const recentTransactions = [
  {
    id: 't1',
    name: 'Grocery Store',
    category: 'Food & Dining',
    date: 'Today, Jun 5, 2026',
    amount: -87.50,
    icon: 'food',
    status: 'completed',
  },
  {
    id: 't2',
    name: 'Salary Deposit',
    category: 'Income',
    date: 'Today, Jun 5, 2026',
    amount: 4215.00,
    icon: 'income',
    status: 'completed',
  },
  {
    id: 't3',
    name: 'Electric Bill',
    category: 'Utilities',
    date: 'Yesterday, Jun 4, 2026',
    amount: -124.30,
    icon: 'utilities',
    status: 'completed',
  },
  {
    id: 't4',
    name: 'Online Shopping',
    category: 'Shopping',
    date: 'Yesterday, Jun 4, 2026',
    amount: -249.99,
    icon: 'shopping',
    status: 'completed',
  },
  {
    id: 't5',
    name: 'Gas Station',
    category: 'Transportation',
    date: 'Jun 3, 2026',
    amount: -52.30,
    icon: 'transport',
    status: 'completed',
  },
  {
    id: 't6',
    name: 'Netflix Subscription',
    category: 'Entertainment',
    date: 'Jun 3, 2026',
    amount: -15.99,
    icon: 'entertainment',
    status: 'completed',
  },
  {
    id: 't7',
    name: 'Freelance Payment',
    category: 'Income',
    date: 'Jun 2, 2026',
    amount: 800.00,
    icon: 'income',
    status: 'pending',
  },
]
