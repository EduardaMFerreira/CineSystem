import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * Componente que protege rotas baseado no estado de autenticação
 * - Se requireAuth=true e não está autenticado: redireciona para /login
 * - Se requireAuth=false e está autenticado: redireciona para /home (evita ver login/cadastro quando já logado)
 */
export default function AuthGuard({
  children,
  requireAuth = false,
  redirectTo,
}: AuthGuardProps) {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  // Se a rota requer autenticação e o usuário não está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  // Se a rota NÃO requer autenticação (como login/register) e o usuário JÁ está autenticado
  // Redireciona para home para evitar que veja telas de login quando já está logado
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo || "/home"} replace />;
  }

  return <>{children}</>;
}

