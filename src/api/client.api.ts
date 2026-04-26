import { http } from "./config/axios.instance";
import type { ClientRequest, ClientResponse } from "./interfaces/client.interfaces";

export const retrieveClients = async (): Promise<ClientResponse[]>  => {
  return await http.get("client/find-all");
}

export const retrieveClientById = async (id: number): Promise<ClientResponse> => {
  return await http.get(`client/find/${id}`);
}

export const retrieveClientByIdNumber = async (nit: string): Promise<ClientResponse> => {
  return await http.get(`client/login/${nit}`);
}

export const saveClient = async (body: ClientRequest): Promise<ClientResponse> => {
  return await http.post("client/save", body);
}

export const updateClient = async (id: number, body: ClientRequest): Promise<ClientResponse> => {
  return await http.put(`client/modify/${id}`, body);
}

export const deleteClient = async (id: number): Promise<boolean> => {
  return await http.delete(`client/delete/${id}`);
}