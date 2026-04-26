import type { ReactNode } from "react"
import useSession from "./useSession";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
}

export default function ProtectedRoute({children}: Props) {
  const { user } = useSession();

  const isInvalidUser = !user || (typeof user === "object" && Object.keys(user).length === 0);

  if (isInvalidUser) {
    return <Navigate to="/login" replace />
  }

  return children;
}