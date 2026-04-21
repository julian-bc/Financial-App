import { http } from "./config/axios.instance";
import type { TransactionRequest, TransactionResponse } from "./interfaces/transaction.interfaces";

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