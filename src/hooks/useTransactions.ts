import { useEffect } from "react";
import { useSetAtom } from "jotai";
import axios from "axios";
import { transactionsAtom, isLoadingAtom, errorAtom } from "@/atoms";
import type { Transaction } from "@/types";

export function useTransactions() {
  const setTransactions = useSetAtom(transactionsAtom);
  const setLoading = useSetAtom(isLoadingAtom);
  const setError = useSetAtom(errorAtom);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      try {
        setTransactions(JSON.parse(stored) as Transaction[]);
        setLoading(false);
        return;
      } catch {
        // fall through to fetch
      }
    }

    setLoading(true);
    axios
      .get<{ transactions: Transaction[] }>("/data.json")
      .then((res) => {
        setTransactions(res.data.transactions);
        localStorage.setItem(
          "transactions",
          JSON.stringify(res.data.transactions)
        );
      })
      .catch(() => setError("Failed to load transaction data."))
      .finally(() => setLoading(false));
  }, [setTransactions, setLoading, setError]);
}
