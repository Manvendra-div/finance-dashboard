import { useAtomValue, useSetAtom } from "jotai";
import { transactionsAtom, activeTabAtom } from "@/atoms";
import { formatCurrency, formatDate } from "@/lib/utils";

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
} as React.CSSProperties;

const thStyle: React.CSSProperties = {
  fontFamily: "Tahoma, Verdana, Arial, sans-serif",
  fontSize: "11px",
  fontWeight: "bold",
  background: "#D4D0C8",
  color: "#000",
  padding: "2px 8px",
  textAlign: "left",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "1px solid #808080",
  borderBottom: "2px solid #404040",
  cursor: "default",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  fontFamily: "Tahoma, Verdana, Arial, sans-serif",
  fontSize: "11px",
  padding: "2px 8px",
  borderBottom: "1px solid #D4D0C8",
  color: "#000",
};

export function RecentTransactions() {
  const transactions = useAtomValue(transactionsAtom);
  const setTab = useSetAtom(activeTabAtom);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-[#D4D0C8]" style={win2kPanel}>
      {/* Title bar */}
      <div className="win-titlebar flex items-center justify-between px-2 py-0.5">
        <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
          Recent Transactions
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

      {/* Toolbar / Address bar */}
      <div className="flex items-center justify-between border-b border-[#808080] bg-[#D4D0C8] px-2 py-0.5">
        <div className="flex items-center gap-1">
          {["File", "Edit", "View"].map((label) => (
            <span key={label} className="win-menu-item cursor-default text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>{label}</span>
          ))}
        </div>
        <button
          onClick={() => setTab("transactions")}
          className="win-btn text-[11px]"
          style={{ fontFamily: "Tahoma, sans-serif" }}
        >
          View All Transactions
        </button>
      </div>

      {/* Table in sunken inset */}
      <div className="m-3" style={win2kSunken}>
        {recent.length === 0 ? (
          <p
            className="py-8 text-center text-[11px] text-[#444]"
            style={{ fontFamily: "Tahoma, sans-serif", background: "#fff" }}
          >
            No transactions yet
          </p>
        ) : (
          <table className="w-full border-collapse" style={{ background: "#fff" }}>
            <thead>
              <tr>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Category</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
                <th style={thStyle}>Type</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t, idx) => (
                <tr
                  key={t.id}
                  style={{ background: idx % 2 === 0 ? "#fff" : "#EEF3FB" }}
                  className="hover:bg-[#0A246A] hover:text-white cursor-default"
                  onMouseEnter={(e) => {
                    const row = e.currentTarget;
                    row.style.background = "#0A246A";
                    row.style.color = "#fff";
                    Array.from(row.querySelectorAll("td")).forEach((td) => {
                      (td as HTMLElement).style.color = "#fff";
                    });
                  }}
                  onMouseLeave={(e) => {
                    const row = e.currentTarget;
                    row.style.background = idx % 2 === 0 ? "#fff" : "#EEF3FB";
                    row.style.color = "#000";
                    Array.from(row.querySelectorAll("td")).forEach((td) => {
                      (td as HTMLElement).style.color = "inherit";
                    });
                  }}
                >
                  <td style={tdStyle}>{t.description}</td>
                  <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>{formatDate(t.date)}</td>
                  <td style={tdStyle}>{t.category}</td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: "bold",
                      color: t.type === "income" ? "#006400" : "#8B0000",
                    }}
                  >
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td style={{ ...tdStyle }}>
                    <span
                      style={{
                        fontFamily: "Tahoma, sans-serif",
                        fontSize: "10px",
                        padding: "1px 5px",
                        background: t.type === "income" ? "#006400" : "#8B0000",
                        color: "#fff",
                      }}
                    >
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Status bar */}
      <div className="win-statusbar flex items-center gap-2 px-2 py-0.5">
        <div
          className="flex-1 text-[11px] text-[#444]"
          style={{ borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff", padding: "1px 4px", fontFamily: "Tahoma, sans-serif" }}
        >
          {recent.length} item(s) — Sorted by date
        </div>
        <div
          className="text-[11px] text-[#444]"
          style={{ borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff", padding: "1px 8px", fontFamily: "Tahoma, sans-serif" }}
        >
          Ready
        </div>
      </div>
    </div>
  );
}
