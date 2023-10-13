import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@utils/hooks/useAuth";
import { Loading } from "./Loading";

interface AuthenticatedProps {
  children: ReactNode;
}

export function Authenticated({ children }: AuthenticatedProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if(isLoading) return <Loading type="spinner" />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
