export const mockTransactions = [
  {
    id: 101,
    transactionType: 'CONSIGNMENT',
    amount: 500000,
    originProduct: null,
    destinyProduct: { cardNumber: "**** **** **** 5678" },
    transactionDate: "2026-04-12T10:30:00"
  },
  {
    id: 102,
    transactionType: 'TRANSFERENCE',
    amount: 150000,
    originProduct: { cardNumber: "**** **** **** 5678" },
    destinyProduct: { cardNumber: "**** **** **** 9012" },
    transactionDate: "2026-04-10T15:45:00"
  },
  {
    id: 103,
    transactionType: 'WITHDRAWAL',
    amount: 80000,
    originProduct: { cardNumber: "**** **** **** 5678" },
    destinyProduct: null,
    transactionDate: "2026-04-08T09:00:00"
  }
];