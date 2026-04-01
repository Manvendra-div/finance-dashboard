import { useAtomValue } from "jotai";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { transactionsAtom, darkModeAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyData } from "@/lib/utils";

export function BalanceTrendChart() {
  const transactions = useAtomValue(transactionsAtom);
  const isDark = useAtomValue(darkModeAtom);
  const data = getMonthlyData(transactions);

  const tooltipStyle = {
    backgroundColor: isDark ? "#1e2a3a" : "#ffffff",
    border: `1px solid ${isDark ? "#2d3f55" : "#e2e8f0"}`,
    borderRadius: "8px",
    fontSize: "12px",
    color: isDark ? "#f1f5f9" : "#0f172a",
  };

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
        </CardHeader>
        <CardContent className="flex h-48 items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-base">Balance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              className="fill-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              className="fill-muted-foreground"
            />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
              contentStyle={tooltipStyle}
              itemStyle={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
              labelStyle={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="url(#incomeGrad)"
              strokeWidth={2}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              fill="url(#expenseGrad)"
              strokeWidth={2}
              name="Expenses"
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              fill="url(#balanceGrad)"
              strokeWidth={2}
              name="Net Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
