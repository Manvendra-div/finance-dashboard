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
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:hidden">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors",
            activeTab === id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className={cn("h-5 w-5", activeTab === id && "stroke-[2.5]")} />
          {label}
        </button>
      ))}
    </nav>
  );
}
