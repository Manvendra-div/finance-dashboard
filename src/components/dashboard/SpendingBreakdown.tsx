import { useAtomValue } from "jotai";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { transactionsAtom, darkModeAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryBreakdown, formatCurrency } from "@/lib/utils";

export function SpendingBreakdown() {
  const transactions = useAtomValue(transactionsAtom);
  const isDark = useAtomValue(darkModeAtom);
  const data = getCategoryBreakdown(transactions);

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
          <CardTitle>Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex h-48 items-center justify-center text-muted-foreground">
          No expense data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-base">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="amount"
              nameKey="category"
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={tooltipStyle}
              itemStyle={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
              labelStyle={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: "12px" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
