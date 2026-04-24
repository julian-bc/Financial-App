export const transactionType = {
  CONSIGNMENT: "CONSIGMENT",
  WITHDRAWAL: "WITHDRAWAL",
  TRANSFERENCE: "TRANSFERENCE"
} as const;

export interface TransactionRequest {
  amount: number;
  originProductId?: number | null;
  destinyProductId?: number | null;
}

export interface TransactionResponse extends TransactionRequest {
  id: number;
  transactionType: typeof transactionType;
  transactionDate: Date;
}