# Finance Dashboard

A clean, interactive finance dashboard for tracking and understanding personal financial activity. Built with Vite, React, TypeScript, Tailwind CSS, and Jotai.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Vite + React + TypeScript | Fast dev setup with full type safety |
| Tailwind CSS | Utility-first styling with dark mode |
| shadcn/ui | Component primitives (Button, Card, Badge, Input, Select) |
| @radix-ui/react-dialog | Accessible modal dialog |
| Recharts | Area, Pie, and Bar charts |
| Jotai | Atomic global state management |
| Axios | Fetches mock data from `/public/data.json` |
| date-fns | Date formatting and parsing |

---

## Getting Started

```bash
cd finance-dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Features

### Dashboard
- Summary cards — Total Balance, Total Income, Total Expenses
- Area chart — monthly income, expenses, and net balance trend over time
- Donut pie chart — spending breakdown by category
- Recent transactions list with a quick link to the full view

### Transactions
- Full transaction list showing date, description, category, type, and amount
- Search by description or category name
- Filter by type (income / expense) and category
- Sort by date or amount (ascending / descending)
- Responsive layout — table on desktop, card list on mobile

### Insights
- Top spending category
- Savings rate as a percentage of total income
- Average monthly expense across all months
- Month-over-month spending change with direction indicator
- Monthly income vs expenses grouped bar chart
- Per-category spending breakdown with progress bars and percentages

### Role-Based UI

Switch roles via the dropdown in the navbar. No backend — purely frontend simulation.

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

### Dark Mode
Toggle with the moon/sun icon in the navbar. Preference persists across sessions via `localStorage`.

### Data Persistence
All transaction changes (add, edit, delete) are saved to `localStorage`. On first load, data is fetched from `/public/data.json` via Axios and cached — subsequent loads skip the network request.

---

## Project Structure

```
finance-dashboard/
├── public/
│   └── data.json              # 67 mock transactions across 6 months
├── src/
│   ├── atoms/                 # Jotai atoms — all global state
│   ├── components/
│   │   ├── ui/                # shadcn-style primitives (Button, Card, Badge, Input, Select, Dialog)
│   │   ├── layout/            # Navbar
│   │   ├── dashboard/         # SummaryCards, BalanceTrendChart, SpendingBreakdown, RecentTransactions
│   │   ├── transactions/      # TransactionFilters, TransactionTable, TransactionModal
│   │   └── insights/          # InsightsSection
│   ├── hooks/
│   │   └── useTransactions.ts # Data fetching — loads data.json into Jotai atom via Axios
│   ├── lib/
│   │   └── utils.ts           # formatCurrency, getMonthlyData, getCategoryBreakdown, getSummary, etc.
│   ├── pages/                 # DashboardPage, TransactionsPage, InsightsPage
│   ├── types/                 # Shared TypeScript interfaces (Transaction, Filters, Role, etc.)
│   ├── App.tsx                # Root component — tab routing, loading/error states
│   ├── main.tsx               # Entry point — Jotai Provider, dark mode init
│   └── index.css              # Tailwind base + CSS custom properties (light/dark theme tokens)
```

---

## State Management

All global state lives in Jotai atoms in `src/atoms/index.ts`:

| Atom | Description |
|---|---|
| `transactionsAtom` | Source of truth for all transaction data |
| `filtersAtom` | Search query, type filter, category filter, sort settings |
| `roleAtom` | Current user role — `admin` or `viewer` |
| `darkModeAtom` | Dark mode toggle state |
| `activeTabAtom` | Currently active page tab |
| `isModalOpenAtom` | Whether the add/edit modal is open |
| `editingTransactionAtom` | The transaction being edited, or `null` for add mode |

Filtered and derived data (monthly totals, category breakdown, etc.) is computed inline with plain JS inside components — no extra selector libraries needed at this scale.

---

## Assumptions

- No backend or authentication — roles are toggled manually for demonstration purposes
- All data originates from `/public/data.json` and is managed client-side
- `localStorage` is used for persistence; clearing it resets to the original mock data on next load
