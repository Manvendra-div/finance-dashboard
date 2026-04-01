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
import { transactionsAtom } from "@/atoms";
import { getMonthlyData } from "@/lib/utils";

const win2kPanel = {
  border: "2px solid",
  borderTopColor: "#ffffff",
  borderLeftColor: "#ffffff",
  borderBottomColor: "#404040",
  borderRightColor: "#404040",
  outline: "1px solid #808080",
  outlineOffset: "-1px",
} as React.CSSProperties;

const win2kSunken = {
  borderTop: "1px solid #404040",
  borderLeft: "1px solid #404040",
  borderBottom: "1px solid #ffffff",
  borderRight: "1px solid #ffffff",
  background: "#ffffff",
} as React.CSSProperties;

export function BalanceTrendChart() {
  const transactions = useAtomValue(transactionsAtom);
  const data = getMonthlyData(transactions);

  if (data.length === 0) {
    return (
      <div className="bg-[#D4D0C8]" style={win2kPanel}>
        <div className="win-titlebar flex items-center gap-1.5 px-2 py-0.5">
          <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
            Balance Trend
          </span>
        </div>
        <div className="flex h-48 items-center justify-center p-4" style={win2kSunken}>
          <p className="text-[11px] text-[#444]" style={{ fontFamily: "Tahoma, sans-serif" }}>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#D4D0C8]" style={win2kPanel}>
      {/* Win2000 title bar */}
      <div className="win-titlebar flex items-center justify-between px-2 py-0.5">
        <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
          Balance Trend - Financial Overview
        </span>
        <div className="flex gap-0.5">
          {["_", "□", "×"].map((c, i) => (
            <button
              key={i}
              className="flex h-4 w-[18px] items-center justify-center bg-[#D4D0C8] text-[10px] font-bold text-black leading-none"
              style={{ borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040" }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Toolbar strip */}
      <div className="flex items-center gap-1 border-b border-[#808080] bg-[#D4D0C8] px-2 py-0.5">
        {["File", "Edit", "View"].map((label) => (
          <span key={label} className="win-menu-item cursor-default text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>{label}</span>
        ))}
      </div>

      {/* Chart area — sunken inset */}
      <div className="m-3" style={win2kSunken}>
        <div className="p-3">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008000" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#008000" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cc0000" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#cc0000" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000080" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#000080" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 2" stroke="#c0c0c0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fontFamily: "Tahoma, sans-serif", fill: "#000" }}
              />
              <YAxis
                tick={{ fontSize: 10, fontFamily: "Tahoma, sans-serif", fill: "#000" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
                }
                contentStyle={{
                  backgroundColor: "#FFFFE1",
                  border: "1px solid #808080",
                  borderRadius: 0,
                  fontSize: "11px",
                  fontFamily: "Tahoma, sans-serif",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "Tahoma, sans-serif" }} />
              <Area type="monotone" dataKey="income" stroke="#008000" fill="url(#incomeGrad)" strokeWidth={1.5} name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="#cc0000" fill="url(#expenseGrad)" strokeWidth={1.5} name="Expenses" />
              <Area type="monotone" dataKey="balance" stroke="#000080" fill="url(#balanceGrad)" strokeWidth={1.5} name="Net Balance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status bar */}
      <div className="win-statusbar flex items-center gap-2 px-2 py-0.5">
        <div
          className="flex-1 text-[11px] text-[#444]"
          style={{ borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff", padding: "1px 4px", fontFamily: "Tahoma, sans-serif" }}
        >
          Ready
        </div>
        <div
          className="text-[11px] text-[#444]"
          style={{ borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff", padding: "1px 8px", fontFamily: "Tahoma, sans-serif" }}
        >
          {data.length} months
        </div>
      </div>
    </div>
  );
}
