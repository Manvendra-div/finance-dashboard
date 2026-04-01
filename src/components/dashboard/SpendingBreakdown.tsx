import { useAtomValue } from "jotai";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { transactionsAtom } from "@/atoms";
import { getCategoryBreakdown, formatCurrency } from "@/lib/utils";

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

export function SpendingBreakdown() {
  const transactions = useAtomValue(transactionsAtom);
  const data = getCategoryBreakdown(transactions);

  if (data.length === 0) {
    return (
      <div className="bg-[#D4D0C8]" style={win2kPanel}>
        <div className="win-titlebar flex items-center px-2 py-0.5">
          <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
            Spending Breakdown
          </span>
        </div>
        <div className="flex h-48 items-center justify-center p-4 m-3" style={win2kSunken}>
          <p className="text-[11px] text-[#444]" style={{ fontFamily: "Tahoma, sans-serif" }}>No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#D4D0C8]" style={win2kPanel}>
      {/* Title bar */}
      <div className="win-titlebar flex items-center justify-between px-2 py-0.5">
        <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
          Spending Breakdown - Category View
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

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-[#808080] bg-[#D4D0C8] px-2 py-0.5">
        {["File", "Edit", "View"].map((label) => (
          <span key={label} className="win-menu-item cursor-default text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>{label}</span>
        ))}
      </div>

      {/* Chart in sunken inset */}
      <div className="m-3" style={win2kSunken}>
        <div className="p-3">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="amount"
                nameKey="category"
                strokeWidth={1}
                stroke="#808080"
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "#FFFFE1",
                  border: "1px solid #808080",
                  borderRadius: 0,
                  fontSize: "11px",
                  fontFamily: "Tahoma, sans-serif",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: "11px", fontFamily: "Tahoma, sans-serif", color: "#000" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status bar */}
      <div className="win-statusbar flex items-center px-2 py-0.5">
        <div
          className="flex-1 text-[11px] text-[#444]"
          style={{ borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff", padding: "1px 4px", fontFamily: "Tahoma, sans-serif" }}
        >
          {data.length} categories
        </div>
      </div>
    </div>
  );
}
