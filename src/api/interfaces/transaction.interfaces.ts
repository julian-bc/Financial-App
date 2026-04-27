export const transactionType = {
  CONSIGNMENT: "CONSIGNMENT",
  WITHDRAWAL: "WITHDRAWAL",
  TRANSFERENCE: "TRANSFERENCE"
} as const;

export type TransactionType = typeof transactionType[keyof typeof transactionType];

export interface TransactionRequest {
  amount: number;
  originProductId?: number | null;
  destinyProductId?: number | null;
}

export interface TransactionResponse extends TransactionRequest {
  id: number;
  transactionType: TransactionType;
  transactionDate: string;
}

export interface PaginatedTransactionResponse {
  content: TransactionResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}