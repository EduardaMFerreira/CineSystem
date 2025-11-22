import { api } from "./api";

export async function loginRequest(email: string, senha: string) {
  try {
    const res = await api.post("/auth/login", { email, senha });
    // backend deve retornar { token, user }
    if (!res.data || !res.data.token) {
      throw new Error("Resposta inválida do servidor");
    }
    return res.data;
  } catch (error: any) {
    // Re-lança o erro para ser tratado no componente
    throw error;
  }
}

export async function registerRequest(nome: string, email: string, senha: string) {
  try {
    const res = await api.post("/auth/register", { nome, email, senha });
    if (!res.data || !res.data.token) {
      throw new Error("Resposta inválida do servidor");
    }
    return res.data;
  } catch (error: any) {
    // Re-lança o erro para ser tratado no componente
    throw error;
  }
}

export async function forgotPasswordRequest(email: string) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

export async function verifyCodeRequest(email: string, codigo: string) {
  const res = await api.post("/auth/verify-code", { email, codigo });
  return res.data;
}

export async function resetPasswordRequest(email: string, token: string, senha: string) {
  const res = await api.post("/auth/reset-password", { email, token, senha });
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
