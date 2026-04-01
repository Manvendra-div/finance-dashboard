import { useAtom } from "jotai";
import { LayoutDashboard, List, Lightbulb } from "lucide-react";
import { activeTabAtom, roleAtom } from "@/atoms";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const tabs = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions" as const, label: "Transactions", icon: List },
  { id: "insights" as const, label: "Insights", icon: Lightbulb },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [role, setRole] = useAtom(roleAtom);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Title bar */}
      <div className="win-titlebar flex items-center justify-between px-2 py-0.5">
        <div className="flex items-center gap-1.5">
          {/* Windows logo icon */}
          <div className="flex h-5 w-5 items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="6.5" height="6.5" fill="#FF0000" />
              <rect x="7.5" y="0" width="6.5" height="6.5" fill="#00FF00" />
              <rect x="0" y="7.5" width="6.5" height="6.5" fill="#0000FF" />
              <rect x="7.5" y="7.5" width="6.5" height="6.5" fill="#FFFF00" />
            </svg>
          </div>
          <span className="text-xs font-bold text-white" style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>
            FinanceTrack
          </span>
        </div>
        {/* Window control buttons */}
        <div className="flex items-center gap-0.5">
          <button
            className="flex h-4 w-[18px] items-center justify-center bg-[#C0C0C0] text-[10px] font-bold leading-none text-black"
            style={{
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
            }}
            aria-label="Minimize"
          >
            _
          </button>
          <button
            className="flex h-4 w-[18px] items-center justify-center bg-[#C0C0C0] text-[10px] font-bold leading-none text-black"
            style={{
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
            }}
            aria-label="Maximize"
          >
            □
          </button>
          <button
            className="flex h-4 w-[18px] items-center justify-center bg-[#C0C0C0] text-[10px] font-bold leading-none text-black"
            style={{
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div
        className="w-full bg-[#D4D0C8] px-1"
        style={{
          borderBottom: "1px solid #808080",
          borderTop: "1px solid #ffffff",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <nav className="flex items-center">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "win-menu-item flex items-center gap-1",
                  activeTab === id && "active"
                )}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-1 py-0.5">
            <label className="text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>
              Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              aria-label="Switch role"
              className="win-input text-[11px]"
              style={{ minWidth: "80px" }}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
