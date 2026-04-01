export type TransactionType = "income" | "expense";

export type Role = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface Filters {
  search: string;
  type: TransactionType | "all";
  category: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  color: string;
}
