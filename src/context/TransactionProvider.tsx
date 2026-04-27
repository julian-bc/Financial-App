import { useState, useEffect, type ReactNode } from "react";
import { TransactionContext, type TransactionContextType } from "./TransactionContext";
import { findPageByProductNumber } from "../api/transaction.api";
import useSession from "../auth/useSession";
import type { TransactionResponse } from "../api/interfaces/transaction.interfaces";

type Props = {
  children: ReactNode;
  productNumber?: string;
};

function TransactionProvider({ children, productNumber }: Props) {
  const { user } = useSession();
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [modifiedTransactions, setModifiedTransactions] = useState(false);

  // Load transactions when productNumber changes or modifiedTransactions is triggered
  useEffect(() => {
    if (!user || !productNumber) {
      setRecentTransactions([]);
      return;
    }

    const loadRecentTransactions = async () => {
      setLoading(true);
      try {
        const response = await findPageByProductNumber(productNumber, 0, 3);
        setRecentTransactions(response.content);
      } catch (error) {
        console.error("Error loading recent transactions:", error);
        setRecentTransactions([]);
      } finally {
        setLoading(false);
        if (modifiedTransactions) {
          setModifiedTransactions(false);
        }
      }
    };

    loadRecentTransactions();
  }, [user, productNumber, modifiedTransactions]);

  const value: TransactionContextType = {
    recentTransactions,
    loading,
    modifiedTransactions,
    setModifiedTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionProvider;
