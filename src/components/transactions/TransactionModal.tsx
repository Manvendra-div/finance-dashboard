import { useState, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { transactionsAtom, isModalOpenAtom, editingTransactionAtom } from "@/atoms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { Transaction, TransactionType } from "@/types";

const CATEGORIES = [
  "Housing", "Food", "Utilities", "Entertainment",
  "Health", "Transport", "Shopping", "Education", "Income", "Other",
];

export function TransactionModal() {
  const [isOpen, setIsOpen] = useAtom(isModalOpenAtom);
  const [editing, setEditing] = useAtom(editingTransactionAtom);
  const setTransactions = useSetAtom(transactionsAtom);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense" as TransactionType,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editing) {
      setForm({
        description: editing.description,
        amount: String(Math.abs(editing.amount)),
        category: editing.category,
        type: editing.type,
        date: editing.date,
      });
    } else {
      setForm({
        description: "",
        amount: "",
        category: "Food",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editing]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setEditing(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount =
      form.type === "expense"
        ? -Math.abs(parseFloat(form.amount))
        : Math.abs(parseFloat(form.amount));

    if (editing) {
      setTransactions((prev) => {
        const updated = prev.map((t) =>
          t.id === editing.id ? { ...t, ...form, amount } : t
        );
        localStorage.setItem("transactions", JSON.stringify(updated));
        return updated;
      });
    } else {
      const newTx: Transaction = {
        id: `t${Date.now()}`,
        ...form,
        amount,
      };
      setTransactions((prev) => {
        const updated = [newTx, ...prev];
        localStorage.setItem("transactions", JSON.stringify(updated));
        return updated;
      });
    }
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Input
              required
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Grocery Store"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Amount ($)</label>
              <Input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>
              <Input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <Select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value as TransactionType }))
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <Select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editing ? "Save Changes" : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
