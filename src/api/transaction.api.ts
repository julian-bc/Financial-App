import { http } from "./config/axios.instance";
import type { TransactionRequest, TransactionResponse, PaginatedTransactionResponse } from "./interfaces/transaction.interfaces";

export const findAll = async(): Promise<TransactionResponse[]> => {
  return await http.get("transaction/find-all");
}

export const findById = async(id: number): Promise<TransactionResponse> => {
  return await http.get(`transaction/find/${id}`);
}

export const consign = async(body: TransactionRequest): Promise<TransactionResponse> => {
  return await http.post("transaction/consign", body);
}

export const withdraw = async(body: TransactionRequest): Promise<TransactionResponse> => {
  return await http.post("transaction/withdraw", body);
}

export const transfer = async(body: TransactionRequest): Promise<TransactionResponse> => {
  return await http.post("transaction/transfer", body);
}

export const findPageByProductNumber = async(
  productNumber: string,
  page: number = 0,
  size: number = 3
): Promise<PaginatedTransactionResponse> => {
  const response = await http.get("transaction/find-page", {
    params: { productNumber, page, size }
  });
  return response.data;
}