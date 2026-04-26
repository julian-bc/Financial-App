import { http } from "./config/axios.instance";
import type { ProductRequest, ProductResponse, PaginatedProductResponse } from "./interfaces/product.interfaces";

export const retrieveProducts = async (): Promise<ProductResponse[]> => {
  const response = await http.get("product/find-all");
  return response.data;
}

export const retrieveProductById = async (id: number): Promise<ProductResponse> => {
  const response = await http.get(`product/find/${id}`);
  return response.data;
}

export const retrieveProductsByClientId = async (clientId: number): Promise<ProductResponse[]> => {
  const response = await http.get(`product/find-by-client/${clientId}`);
  return response.data;
}

export const searchProductsByNumber = async (productNumber: string): Promise<PaginatedProductResponse> => {
  const response = await http.get(`product/find-by-number`, {
    params: { productNumber }
  });
  return response.data;
} 

export const saveProduct = async (body: ProductRequest): Promise<ProductResponse> => {
  const response = await http.post("product/save", body);
  return response.data;
}

export const activeProduct = async (id: number): Promise<ProductResponse> => {
  const response = await http.put(`product/active/${id}`);
  return response.data;
}

export const disableProduct = async (id: number): Promise<ProductResponse> => {
  const response = await http.put(`product/disable/${id}`);
  return response.data;
}

export const cancelProduct = async (id: number): Promise<ProductResponse> => {
  const response = await http.put(`product/cancel/${id}`);
  return response.data;
}

export const  exemptGMF = async (id: number): Promise<ProductResponse> => {
  const response = await http.put(`product/gmf-exempt/${id}`);
  return response.data;
}

export const disableExemptGMF = async (id: number): Promise<ProductResponse> => {
  const response = await http.put(`product/disable-gmf-exempt/${id}`);
  return response.data;
}

export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await http.delete(`product/delete/${id}`);
  return response.data;
}