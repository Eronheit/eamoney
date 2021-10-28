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

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> 

type TransactionContextData = {
	transactions: Transaction[];
	createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

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

	async function createTransaction(transaction: TransactionInput) {
		await api.post('/transactions', transaction);
	} 

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}
