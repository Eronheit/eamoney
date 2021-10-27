import { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "./services/api";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

export const TransactionsContext = createContext<Transaction[]>([]);

type TransactionsProviderProps = {
  children: ReactNode;
};

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) =>
        setTransactions(
          (response as AxiosResponse<{ transactions: Transaction[] }>).data
            .transactions
        )
      );
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
