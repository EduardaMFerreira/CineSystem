import { api } from "./api";

export async function criarReserva(sessaoId: number, assentos: number[]) {
  const res = await api.post("/reservas", { sessaoId, assentos });
  return res.data;
}

export async function listarReservasUsuario() {
  const res = await api.get("/reservas/me");
  return res.data;
}
