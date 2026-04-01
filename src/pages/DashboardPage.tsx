import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingBreakdown } from "@/components/dashboard/SpendingBreakdown";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>
      <RecentTransactions />
    </div>
  );
}
