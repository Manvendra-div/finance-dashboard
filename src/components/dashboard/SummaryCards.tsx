import { useAtomValue } from "jotai";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { transactionsAtom } from "@/atoms";
import { Card, CardContent } from "@/components/ui/card";
import { getSummary, formatCurrency, cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
  bgClass: string;
}

function StatCard({ title, value, icon, trend, colorClass, bgClass }: StatCardProps) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={cn("mt-1 text-2xl font-bold", colorClass)}>{value}</p>
            {trend && (
              <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className={cn("rounded-lg p-2.5", bgClass)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCards() {
  const transactions = useAtomValue(transactionsAtom);
  const { totalBalance, totalIncome, totalExpenses } = getSummary(transactions);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        title="Total Balance"
        value={formatCurrency(totalBalance)}
        icon={<Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
        colorClass="text-foreground"
        bgClass="bg-indigo-100 dark:bg-indigo-900/30"
        trend="All time net"
      />
      <StatCard
        title="Total Income"
        value={formatCurrency(totalIncome)}
        icon={<TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
        colorClass="text-emerald-600 dark:text-emerald-400"
        bgClass="bg-emerald-100 dark:bg-emerald-900/30"
        trend="All time earnings"
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon={<TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />}
        colorClass="text-red-600 dark:text-red-400"
        bgClass="bg-red-100 dark:bg-red-900/30"
        trend="All time spending"
      />
    </div>
  );
}
