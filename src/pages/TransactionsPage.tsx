import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionModal } from "@/components/transactions/TransactionModal";

export function TransactionsPage() {
  return (
    <div className="space-y-4">
      <TransactionFilters />
      <TransactionTable />
      <TransactionModal />
    </div>
  );
}
