import { useState, type ReactNode } from "react";
import { SessionContext, type SessionContextType } from "./SessionContext";
import { saveClient } from "../api/client.api";
import type { ClientRequest } from "../api/interfaces/client.interfaces";

type Props = {
  children: ReactNode;
}

function SessionProvider ({children}: Props) {
  const [user, setUser] = useState<object | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user: object) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  const register = async (clientData: ClientRequest) => {
    await saveClient(clientData);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value: SessionContextType = {user, login, register, logout}

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider