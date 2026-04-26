import { createContext } from "react";
import type { ProductResponse, ProductRequest } from "../api/interfaces/product.interfaces";

export interface ProductContextType {
  userProducts: ProductResponse[];
  loading: boolean;
  error: string | null;
  setUserProducts: (products: ProductResponse[]) => void;
  addUserProduct: (product: ProductResponse) => void;
  removeUserProduct: (productId: number) => void;
  updateUserProduct: (product: ProductResponse) => void;
  clearUserProducts: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setModifiedProducts: (modified: boolean) => void;
  // Métodos de API
  getAllProducts: () => Promise<ProductResponse[]>;
  getProductById: (id: number) => Promise<ProductResponse | null>;
  createProduct: (body: ProductRequest) => Promise<ProductResponse | null>;
  activateProduct: (id: number) => Promise<ProductResponse | null>;
  disableProductHandler: (id: number) => Promise<ProductResponse | null>;
  cancelProductHandler: (id: number) => Promise<ProductResponse | null>;
  exemptGMFHandler: (id: number) => Promise<ProductResponse | null>;
  disableExemptGMFHandler: (id: number) => Promise<ProductResponse | null>;
  deleteProductHandler: (id: number) => Promise<boolean>;
}

export const ProductContext = createContext<ProductContextType>({
  userProducts: [],
  loading: false,
  error: null,
  setUserProducts: () => {},
  addUserProduct: () => {},
  removeUserProduct: () => {},
  updateUserProduct: () => {},
  clearUserProducts: () => {},
  setLoading: () => {},
  setError: () => {},
  setModifiedProducts: () => {},
  getAllProducts: async () => [],
  getProductById: async () => null,
  createProduct: async () => null,
  activateProduct: async () => null,
  disableProductHandler: async () => null,
  cancelProductHandler: async () => null,
  exemptGMFHandler: async () => null,
  disableExemptGMFHandler: async () => null,
  deleteProductHandler: async () => false,
});