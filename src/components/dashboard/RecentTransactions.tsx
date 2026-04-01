import { useAtomValue, useSetAtom } from "jotai";
import { ArrowUpRight } from "lucide-react";
import { transactionsAtom, activeTabAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

export function RecentTransactions() {
  const transactions = useAtomValue(transactionsAtom);
  const setTab = useSetAtom(activeTabAtom);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setTab("transactions")}
        >
          View all <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No transactions yet
          </p>
        ) : (
          <ul className="space-y-3">
            {recent.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {t.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(t.date)} · {t.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={
                      t.type === "income"
                        ? "text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                        : "text-sm font-semibold text-red-600 dark:text-red-400"
                    }
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </span>
                  <Badge variant={t.type}>{t.type}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
