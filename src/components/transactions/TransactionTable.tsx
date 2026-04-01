import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  transactionsAtom,
  filtersAtom,
  roleAtom,
  isModalOpenAtom,
  editingTransactionAtom,
} from "@/atoms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types";

function useFilteredTransactions() {
  const transactions = useAtomValue(transactionsAtom);
  const filters = useAtomValue(filtersAtom);

  return transactions
    .filter((t) => {
      const matchSearch =
        filters.search === "" ||
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === "all" || t.type === filters.type;
      const matchCategory =
        filters.category === "all" || t.category === filters.category;
      return matchSearch && matchType && matchCategory;
    })
    .sort((a, b) => {
      if (filters.sortBy === "date") {
        const diff =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return filters.sortOrder === "asc" ? diff : -diff;
      } else {
        const diff = Math.abs(a.amount) - Math.abs(b.amount);
        return filters.sortOrder === "asc" ? diff : -diff;
      }
    });
}

export function TransactionTable() {
  const role = useAtomValue(roleAtom);
  const setTransactions = useSetAtom(transactionsAtom);
  const setIsOpen = useSetAtom(isModalOpenAtom);
  const [, setEditing] = useAtom(editingTransactionAtom);
  const filtered = useFilteredTransactions();

  const handleEdit = (t: Transaction) => {
    setEditing(t);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">
          Transactions
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filtered.length})
          </span>
        </CardTitle>
        {role === "admin" && (
          <Button
            size="sm"
            className="gap-1"
            onClick={() => {
              setEditing(null);
              setIsOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-sm">No transactions match your filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
                    {role === "admin" && (
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-border/50 transition-colors hover:bg-accent/30"
                    >
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(t.date)}</td>
                      <td className="px-4 py-3 font-medium">{t.description}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={t.type}>{t.type}</Badge>
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          t.type === "income"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}
                        {formatCurrency(t.amount)}
                      </td>
                      {role === "admin" && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleEdit(t)}
                              aria-label="Edit transaction"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(t.id)}
                              aria-label="Delete transaction"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-border md:hidden">
              {filtered.map((t) => (
                <li key={t.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {t.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(t.date)} · {t.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        t.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </span>
                    {role === "admin" && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleEdit(t)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => handleDelete(t.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
