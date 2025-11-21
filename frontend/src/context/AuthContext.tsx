import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { loginRequest } from "../services/authService";

interface AuthContextType {
  isLogged: boolean;
  user: any | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // opcional: buscar /auth/me para preencher user
    // exemplo: api.get('/auth/me').then(res => setUser(res.data))
  }, [isLogged]);

  async function login(email: string, senha: string) {
    const data = await loginRequest(email, senha);
    localStorage.setItem("token", data.token);
    setIsLogged(true);
    setUser(data.user ?? null);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
