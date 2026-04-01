import { useAtom } from "jotai";
import { LayoutDashboard, List, Lightbulb } from "lucide-react";
import { activeTabAtom } from "@/atoms";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions" as const, label: "Transactions", icon: List },
  { id: "insights" as const, label: "Insights", icon: Lightbulb },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <nav
      className="win-taskbar fixed bottom-0 left-0 right-0 z-40 flex items-center px-1 py-0.5 sm:hidden"
      style={{ height: "38px" }}
    >
      {/* Start button */}
      <button
        className="mr-2 flex items-center gap-1.5 px-2 py-0.5 font-bold text-[11px]"
        style={{
          background: "#D4D0C8",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          outline: "1px solid #808080",
          outlineOffset: "-1px",
          fontFamily: "Tahoma, sans-serif",
          color: "#000",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <rect x="0" y="0" width="6.5" height="6.5" fill="#FF0000" />
          <rect x="7.5" y="0" width="6.5" height="6.5" fill="#00FF00" />
          <rect x="0" y="7.5" width="6.5" height="6.5" fill="#0000FF" />
          <rect x="7.5" y="7.5" width="6.5" height="6.5" fill="#FFFF00" />
        </svg>
        Start
      </button>

      {/* Separator */}
      <div
        className="mr-2 h-6"
        style={{ borderLeft: "1px solid #808080", borderRight: "1px solid #fff" }}
      />

      {/* Tab buttons */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 truncate px-2 py-0.5 text-[11px]",
            )}
            style={{
              fontFamily: "Tahoma, sans-serif",
              minWidth: 0,
              background: "#D4D0C8",
              color: "#000",
              ...(activeTab === id
                ? {
                    borderTop: "2px solid #404040",
                    borderLeft: "2px solid #404040",
                    borderRight: "2px solid #fff",
                    borderBottom: "2px solid #fff",
                    outline: "1px solid #808080",
                    outlineOffset: "-1px",
                  }
                : {
                    borderTop: "2px solid #fff",
                    borderLeft: "2px solid #fff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                    outline: "1px solid #808080",
                    outlineOffset: "-1px",
                  }),
            }}
          >
            <Icon className="h-3 w-3 shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* System tray clock */}
      <div
        className="ml-2 px-2 text-[10px]"
        style={{
          fontFamily: "Tahoma, sans-serif",
          borderTop: "1px solid #808080",
          borderLeft: "1px solid #808080",
          borderBottom: "1px solid #fff",
          borderRight: "1px solid #fff",
          color: "#000",
        }}
      >
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </nav>
  );
}
