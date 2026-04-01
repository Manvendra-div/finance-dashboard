import { useAtomValue } from "jotai";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Award } from "lucide-react";
import { transactionsAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMonthlyData,
  getCategoryBreakdown,
  getSummary,
  formatCurrency,
} from "@/lib/utils";

function InsightCard({
  icon,
  title,
  value,
  description,
  colorClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  colorClass: string;
}) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 rounded-lg p-2 ${colorClass}`}>{icon}</div>
          <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className="mt-0.5 text-lg font-bold">{value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InsightsSection() {
  const transactions = useAtomValue(transactionsAtom);
  const monthly = getMonthlyData(transactions);
  const categories = getCategoryBreakdown(transactions);
  const { totalIncome, totalExpenses } = getSummary(transactions);

  const topCategory = categories[0];
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : "0";

  const lastTwo = monthly.slice(-2);
  const monthlyChange =
    lastTwo.length === 2
      ? lastTwo[1].expenses - lastTwo[0].expenses
      : null;

  const avgMonthlyExpense =
    monthly.length > 0
      ? monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length
      : 0;

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <AlertCircle className="mb-2 h-8 w-8" />
        <p>No data to show insights for.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Insight cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InsightCard
          icon={<Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
          title="Top Spending Category"
          value={topCategory?.category ?? "—"}
          description={topCategory ? formatCurrency(topCategory.amount) + " total" : "No data"}
          colorClass="bg-amber-100 dark:bg-amber-900/30"
        />
        <InsightCard
          icon={<TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
          title="Savings Rate"
          value={`${savingsRate}%`}
          description="Of total income saved"
          colorClass="bg-emerald-100 dark:bg-emerald-900/30"
        />
        <InsightCard
          icon={<TrendingDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          title="Avg Monthly Expense"
          value={formatCurrency(avgMonthlyExpense)}
          description="Across all months"
          colorClass="bg-blue-100 dark:bg-blue-900/30"
        />
        <InsightCard
          icon={
            monthlyChange !== null && monthlyChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )
          }
          title="Month-over-Month"
          value={
            monthlyChange !== null
              ? `${monthlyChange > 0 ? "+" : ""}${formatCurrency(monthlyChange)}`
              : "—"
          }
          description={
            monthlyChange !== null
              ? monthlyChange > 0
                ? "Spending increased vs last month"
                : "Spending decreased vs last month"
              : "Not enough data"
          }
          colorClass={
            monthlyChange !== null && monthlyChange > 0
              ? "bg-red-100 dark:bg-red-900/30"
              : "bg-emerald-100 dark:bg-emerald-900/30"
          }
        />
      </div>

      {/* Monthly comparison bar chart */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category breakdown table */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((cat) => {
              const pct = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
              return (
                <div key={cat.category}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{cat.category}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(cat.amount)}{" "}
                      <span className="text-xs">({pct.toFixed(1)}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
