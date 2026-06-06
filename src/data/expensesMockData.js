// ─── Expenses Mock Data ───────────────────────────────────────────────────────
export const expensesMock = [
  { id: 'e1',  description: 'Grocery Store',       category: 'Food & Dining',    amount: 87.50,  date: 'Jun 5, 2026',  paymentMethod: 'Credit Card',  status: 'completed' },
  { id: 'e2',  description: 'Gas Station',          category: 'Transportation',   amount: 52.30,  date: 'Jun 5, 2026',  paymentMethod: 'Debit Card',   status: 'completed' },
  { id: 'e3',  description: 'Online Shopping',      category: 'Shopping',         amount: 231.00, date: 'Jun 4, 2026',  paymentMethod: 'Credit Card',  status: 'completed' },
  { id: 'e4',  description: 'Electric Bill',        category: 'Utilities',        amount: 124.30, date: 'Jun 4, 2026',  paymentMethod: 'Credit Card',  status: 'completed' },
  { id: 'e5',  description: 'Netflix Subscription', category: 'Entertainment',    amount: 15.99,  date: 'Jun 3, 2026',  paymentMethod: 'Credit Card',  status: 'completed' },
  { id: 'e6',  description: 'Movie Tickets',        category: 'Entertainment',    amount: 42.50,  date: 'Jun 2, 2026',  paymentMethod: 'Debit Card',   status: 'completed' },
  { id: 'e7',  description: 'Coffee Shop',          category: 'Food & Dining',    amount: 18.75,  date: 'Jun 2, 2026',  paymentMethod: 'Cash',         status: 'completed' },
  { id: 'e8',  description: 'Gym Membership',       category: 'Health & Fitness', amount: 49.00,  date: 'Jun 1, 2026',  paymentMethod: 'Debit Card',   status: 'pending'   },
  { id: 'e9',  description: 'Restaurant Dinner',    category: 'Food & Dining',    amount: 98.40,  date: 'May 31, 2026', paymentMethod: 'Credit Card',  status: 'completed' },
  { id: 'e10', description: 'Internet Bill',        category: 'Utilities',        amount: 69.99,  date: 'May 30, 2026', paymentMethod: 'Bank Transfer', status: 'completed' },
  { id: 'e11', description: 'Pharmacy',             category: 'Health & Fitness', amount: 33.20,  date: 'May 29, 2026', paymentMethod: 'Cash',         status: 'completed' },
  { id: 'e12', description: 'Train Ticket',         category: 'Transportation',   amount: 28.60,  date: 'May 28, 2026', paymentMethod: 'Credit Card',  status: 'failed'    },
]

// ─── Budget Mock Data ─────────────────────────────────────────────────────────
export const budgetsMock = [
  {
    id: 'b1',
    category: 'Food & Dining',
    icon: 'utensils',
    color: '#14b8a6',
    colorBg: 'rgba(20,184,166,0.1)',
    limit: 2000,
    spent: 1624,
    transactions: 23,
    period: 'Jun 2026',
  },
  {
    id: 'b2',
    category: 'Transportation',
    icon: 'car',
    color: '#6366f1',
    colorBg: 'rgba(99,102,241,0.1)',
    limit: 600,
    spent: 530,
    transactions: 18,
    period: 'Jun 2026',
  },
  {
    id: 'b3',
    category: 'Shopping',
    icon: 'shopping-bag',
    color: '#0ea5e9',
    colorBg: 'rgba(14,165,233,0.1)',
    limit: 1500,
    spent: 1180,
    transactions: 12,
    period: 'Jun 2026',
  },
  {
    id: 'b4',
    category: 'Utilities',
    icon: 'zap',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.1)',
    limit: 800,
    spent: 1190,
    transactions: 8,
    period: 'Jun 2026',
  },
  {
    id: 'b5',
    category: 'Entertainment',
    icon: 'tv',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.1)',
    limit: 500,
    spent: 620,
    transactions: 15,
    period: 'Jun 2026',
  },
  {
    id: 'b6',
    category: 'Health & Fitness',
    icon: 'heart',
    color: '#22c55e',
    colorBg: 'rgba(34,197,94,0.1)',
    limit: 400,
    spent: 340,
    transactions: 5,
    period: 'Jun 2026',
  },
]

// ─── Reports Mock Data ────────────────────────────────────────────────────────
export const monthlySpendingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  income:   [6200, 7100, 6800, 7900, 8100, 8430],
  expenses: [4100, 4600, 4200, 5100, 4800, 5240],
  savings:  [2100, 2500, 2600, 2800, 3300, 3190],
}

export const categoryBreakdownData = [
  { label: 'Food & Dining',   value: 1624, percent: 31, color: '#14b8a6' },
  { label: 'Transportation',  value: 530,  percent: 10, color: '#6366f1' },
  { label: 'Shopping',        value: 1180, percent: 23, color: '#0ea5e9' },
  { label: 'Entertainment',   value: 620,  percent: 12, color: '#f59e0b' },
  { label: 'Utilities',       value: 1190, percent: 18, color: '#8b5cf6' },
  { label: 'Health & Fitness',value: 340,  percent: 6,  color: '#22c55e' },
]

export const weeklyTrendData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  thisMonth: [1200, 1450, 1300, 1290],
  lastMonth: [1100, 1200, 1350, 1150],
}

export const reportStats = {
  totalSpent:    '$5,240',
  highestCategory: 'Utilities',
  overBudget:    '2 Over Budget',
  avgMonthly:    '$4,837',
}
