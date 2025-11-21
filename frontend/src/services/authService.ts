import { api } from "./api";

export async function loginRequest(email: string, senha: string) {
  const res = await api.post("/auth/login", { email, senha });
  // backend deve retornar { token, user }
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
