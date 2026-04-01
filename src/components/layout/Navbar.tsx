import { useAtom } from "jotai";
import { Moon, Sun, LayoutDashboard, List, Lightbulb } from "lucide-react";
import { activeTabAtom, darkModeAtom, roleAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const tabs = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions" as const, label: "Transactions", icon: List },
  { id: "insights" as const, label: "Insights", icon: Lightbulb },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [role, setRole] = useAtom(roleAtom);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", String(next));
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">F</span>
          </div>
          <span className="hidden font-semibold sm:block">FinanceTrack</span>
        </div>

        {/* Nav tabs — hidden on mobile, shown sm+ */}
        <nav className="hidden sm:flex items-center gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeTab === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-28 text-xs"
            aria-label="Switch role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
