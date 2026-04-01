import { useAtom, useAtomValue } from "jotai";
import { Search, X } from "lucide-react";
import { filtersAtom, transactionsAtom } from "@/atoms";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getUniqueCategories } from "@/lib/utils";

export function TransactionFilters() {
  const [filters, setFilters] = useAtom(filtersAtom);
  const transactions = useAtomValue(transactionsAtom);
  const categories = getUniqueCategories(transactions);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.type !== "all" ||
    filters.category !== "all";

  const reset = () =>
    setFilters((f) => ({ ...f, search: "", type: "all", category: "all" }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        />
      </div>
      <Select
        value={filters.type}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            type: e.target.value as typeof filters.type,
          }))
        }
        className="w-32"
        aria-label="Filter by type"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>
      <Select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="w-36"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
      <Select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split("-") as [
            typeof filters.sortBy,
            typeof filters.sortOrder
          ];
          setFilters((f) => ({ ...f, sortBy, sortOrder }));
        }}
        className="w-40"
        aria-label="Sort by"
      >
        <option value="date-desc">Date (Newest)</option>
        <option value="date-asc">Date (Oldest)</option>
        <option value="amount-desc">Amount (High)</option>
        <option value="amount-asc">Amount (Low)</option>
      </Select>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={reset} className="gap-1">
          <X className="h-3 w-3" /> Clear
        </Button>
      )}
    </div>
  );
}
