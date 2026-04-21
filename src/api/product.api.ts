import { http } from "./config/axios.instance";
import type { ProductRequest, ProductResponse } from "./interfaces/product.interfaces";

export const retrieveProducts = async (): Promise<ProductResponse[]> => {
  return await http.get("product/find-all");
}

export const retrieveProductById = async (id: number): Promise<ProductResponse> => {
  return await http.get(`product/find/${id}`);
}

export const saveProduct = async (body: ProductRequest): Promise<ProductResponse> => {
  return await http.post("product/save", body);
}

export const activeProduct = async (id: number): Promise<ProductResponse> => {
  return await http.put(`product/active/${id}`);
}

export const disableProduct = async (id: number): Promise<ProductResponse> => {
  return await http.put(`product/disable/${id}`);
}

export const cancelProduct = async (id: number): Promise<ProductResponse> => {
  return await http.put(`product/cancel/${id}`);
}

export const  exemptGMF = async (id: number): Promise<ProductResponse> => {
  return await http.put(`product/gmf-exempt/${id}`);
}

export const disableExemptGMF = async (id: number): Promise<ProductResponse> => {
  return await http.put(`product/disable-gmf-exempt/${id}`);
}

export const deleteProduct = async (id: number): Promise<boolean> => {
  return await http.delete(`product/delete/${id}`);
}