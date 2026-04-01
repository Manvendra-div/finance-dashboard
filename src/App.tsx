import { useAtomValue } from "jotai";
import { activeTabAtom, isLoadingAtom, errorAtom } from "@/atoms";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { useTransactions } from "@/hooks/useTransactions";
import { AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-background" style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}>
      <Navbar />
      <main className="mx-auto max-w-7xl px-3 py-4 pb-14 sm:pb-4 sm:px-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              {/* Win2000 progress bar */}
              <div
                className="h-5 w-48 overflow-hidden bg-white"
                style={{ border: "1px solid #808080" }}
              >
                <div
                  className="h-full animate-pulse bg-[#0A246A]"
                  style={{ width: "60%" }}
                />
              </div>
              <p className="text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>
                Loading financial data...
              </p>
            </div>
          </div>
        ) : error ? (
          <div
            className="mx-auto mt-8 max-w-sm bg-[#D4D0C8] p-0"
            style={{
              border: "2px solid", borderTopColor: "#fff", borderLeftColor: "#fff",
              borderRightColor: "#404040", borderBottomColor: "#404040",
            }}
          >
            <div
              className="flex items-center gap-1.5 px-2 py-0.5"
              style={{ background: "linear-gradient(to right, #8B0000 0%, #C0C0C0 100%)" }}
            >
              <AlertCircle className="h-3 w-3 text-white" />
              <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Tahoma, sans-serif" }}>
                Error
              </span>
            </div>
            <div className="p-4">
              <p className="text-[11px]" style={{ fontFamily: "Tahoma, sans-serif" }}>{error}</p>
              <div className="mt-3 flex justify-center">
                <button
                  className="win-btn min-w-[75px] text-[11px]"
                  style={{ fontFamily: "Tahoma, sans-serif" }}
                  onClick={() => window.location.reload()}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : (
          <PageContent />
        )}
      </main>
      <BottomNav />
    </div>
  );
}
