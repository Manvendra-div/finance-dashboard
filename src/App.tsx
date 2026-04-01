import { useAtomValue } from "jotai";
import { activeTabAtom, isLoadingAtom, errorAtom } from "@/atoms";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { useTransactions } from "@/hooks/useTransactions";
import { AlertCircle, Loader2 } from "lucide-react";

function PageContent() {
  const activeTab = useAtomValue(activeTabAtom);
  switch (activeTab) {
    case "dashboard":
      return <DashboardPage />;
    case "transactions":
      return <TransactionsPage />;
    case "insights":
      return <InsightsPage />;
    default:
      return <DashboardPage />;
  }
}

export default function App() {
  useTransactions(); // loads data into atoms
  const isLoading = useAtomValue(isLoadingAtom);
  const error = useAtomValue(errorAtom);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:pb-6 sm:px-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <PageContent />
        )}
      </main>
      <BottomNav />
    </div>
  );
}
