import { http } from "./config/axios.instance";
import type { ClientRequest, ClientResponse } from "./interfaces/client.interfaces";

export const retrieveClients = async (): Promise<ClientResponse[]>  => {
  const response = await http.get("client/find-all");
  return response.data;
}

export const retrieveClientById = async (id: number): Promise<ClientResponse> => {
  const response = await http.get(`client/find/${id}`);
  return response.data;
}

export const retrieveClientByIdNumber = async (nit: string): Promise<ClientResponse> => {
  const response = await http.get(`client/login/${nit}`);
  return response.data;
}

export const saveClient = async (body: ClientRequest): Promise<ClientResponse> => {
  const response = await http.post("client/save", body);
  return response.data;
}

export const updateClient = async (id: number, body: ClientRequest): Promise<ClientResponse> => {
  const response = await http.put(`client/modify/${id}`, body);
  return response.data;
}

export const deleteClient = async (id: number): Promise<boolean> => {
  const response = await http.delete(`client/delete/${id}`);
  return response.data;
}