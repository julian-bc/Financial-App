import { createContext } from "react";
import type { ClientRequest } from "../api/interfaces/client.interfaces";

export interface SessionContextType {
  user: any;
  login: (userData: object) => void;
  register: (userData: ClientRequest) => Promise<void>;
  logout: () => void;
} 

export const SessionContext = createContext<SessionContextType>({
  user: {},
  login: () => {},
  register: async () => {},
  logout: () => {}
});