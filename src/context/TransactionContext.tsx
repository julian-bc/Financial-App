import { createContext } from "react";
import type { TransactionResponse } from "../api/interfaces/transaction.interfaces";

export interface TransactionContextType {
  recentTransactions: TransactionResponse[];
  loading: boolean;
  modifiedTransactions: boolean;
  setModifiedTransactions: (value: boolean) => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);
