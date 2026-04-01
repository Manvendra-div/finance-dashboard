import { atom } from "jotai";
import type { Transaction, Filters, Role } from "@/types";

// Core data
export const transactionsAtom = atom<Transaction[]>([]);
export const isLoadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);

// Role
export const roleAtom = atom<Role>("viewer");

// Dark mode
export const darkModeAtom = atom<boolean>(
  typeof window !== "undefined"
    ? localStorage.getItem("darkMode") === "true"
    : false
);

// Filters
export const filtersAtom = atom<Filters>({
  search: "",
  type: "all",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
});

// Active nav tab
export const activeTabAtom = atom<"dashboard" | "transactions" | "insights">(
  "dashboard"
);

// Modal state for add/edit transaction (admin only)
export const editingTransactionAtom = atom<Transaction | null>(null);
export const isModalOpenAtom = atom<boolean>(false);
