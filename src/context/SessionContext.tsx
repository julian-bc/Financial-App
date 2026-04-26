import { createContext } from "react";

export interface SessionContextType {
  user: any;
  login: (userData: object) => void;
  logout: () => void;
} 

export const SessionContext = createContext<SessionContextType>({
  user: {},
  login: () => {},
  logout: () => {}
});