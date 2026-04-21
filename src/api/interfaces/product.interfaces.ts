export const accountType = {
  CORRIENTE: "CORRIENTE",
  AHORROS: "AHORROS"
} as const;

export const accountState = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  CANCELLED: "CANCELLED"
} as const;

export interface ProductRequest {
  clientId: number;
  productType: typeof accountType;
  productState: typeof accountState;
  gmfExempt: boolean;
}

export interface ProductResponse extends ProductRequest {
  id: number;
  productNumber: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}