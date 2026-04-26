export const accountType = {
  CORRIENTE: "CORRIENTE",
  AHORROS: "AHORROS"
} as const;

export const accountState = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  CANCELLED: "CANCELLED"
} as const;

export type AccountType = typeof accountType[keyof typeof accountType];
export type AccountState = typeof accountState[keyof typeof accountState];

export interface ProductRequest {
  clientId: number;
  productType: AccountType;
  productState: AccountState;
  gmfExempt: boolean;
}

export interface ProductResponse extends ProductRequest {
  id: number;
  productNumber: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  firstName: string;
  lastName: string;
}

export interface ProductResponseWithClient extends ProductResponse {
  client: Client;
  createdDate: string;
  lastModifiedDate: string;
}

export interface PaginatedProductResponse {
  content: ProductResponseWithClient[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}