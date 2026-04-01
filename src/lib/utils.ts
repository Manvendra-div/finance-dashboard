import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import type { Transaction, MonthlyData, CategoryData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "MMM dd, yyyy");
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const map = new Map<string, { income: number; expenses: number }>();

  transactions.forEach((t) => {
    const key = format(parseISO(t.date), "MMM yyyy");
    const existing = map.get(key) ?? { income: 0, expenses: 0 };
    if (t.type === "income") {
      existing.income += t.amount;
    } else {
      existing.expenses += Math.abs(t.amount);
    }
    map.set(key, existing);
  });

  return Array.from(map.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
}

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#6366f1",
  Food: "#f59e0b",
  Utilities: "#3b82f6",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Transport: "#8b5cf6",
  Shopping: "#f97316",
  Education: "#14b8a6",
  Income: "#22c55e",
  Other: "#94a3b8",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Other"];
}

export function getCategoryBreakdown(
  transactions: Transaction[]
): CategoryData[] {
  const map = new Map<string, number>();

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const existing = map.get(t.category) ?? 0;
      map.set(t.category, existing + Math.abs(t.amount));
    });

  return Array.from(map.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      color: getCategoryColor(category),
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getSummary(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  };
}

export function getUniqueCategories(transactions: Transaction[]): string[] {
  return Array.from(new Set(transactions.map((t) => t.category))).sort();
}
