import { useAtomValue } from "jotai";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { transactionsAtom } from "@/atoms";
import { getSummary, formatCurrency } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  valueColor: string;
}

function StatCard({ title, value, icon, trend, valueColor }: StatCardProps) {
  return (
    <div
      className="bg-[#D4D0C8]"
      style={{
        border: "2px solid",
        borderTopColor: "#ffffff",
        borderLeftColor: "#ffffff",
        borderBottomColor: "#404040",
        borderRightColor: "#404040",
        outline: "1px solid #808080",
        outlineOffset: "-1px",
      }}
    >
      {/* Title bar */}
      <div
        className="win-titlebar flex items-center gap-1 px-2 py-0.5"
      >
        <span className="text-white">{icon}</span>
        <span
          className="text-[11px] font-bold text-white"
          style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}
        >
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="p-3">
        {/* Sunken value display */}
        <div
          className="bg-white p-2"
          style={{
            borderTop: "1px solid #404040",
            borderLeft: "1px solid #404040",
            borderBottom: "1px solid #ffffff",
            borderRight: "1px solid #ffffff",
          }}
        >
          <p
            className="text-xl font-bold"
            style={{ color: valueColor, fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}
          >
            {value}
          </p>
        </div>
        {trend && (
          <p
            className="mt-1.5 text-[11px] text-[#444444]"
            style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}
          >
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export function SummaryCards() {
  const transactions = useAtomValue(transactionsAtom);
  const { totalBalance, totalIncome, totalExpenses } = getSummary(transactions);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard
        title="Total Balance"
        value={formatCurrency(totalBalance)}
        icon={<Wallet className="h-3 w-3" />}
        valueColor="#000080"
        trend="All time net"
      />
      <StatCard
        title="Total Income"
        value={formatCurrency(totalIncome)}
        icon={<TrendingUp className="h-3 w-3" />}
        valueColor="#006400"
        trend="All time earnings"
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon={<TrendingDown className="h-3 w-3" />}
        valueColor="#8B0000"
        trend="All time spending"
      />
    </div>
  );
}
