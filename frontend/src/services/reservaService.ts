import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Token
function getToken() {
  return localStorage.getItem("token");
}

/** Criar reserva */
export async function criarReserva(sessaoId: number) {
  const token = getToken();
  const res = await api.post(
    "/reservas",
    { sessaoId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.reserva;
}

/** Listar reservas */
export async function listarReservas() {
  const token = getToken();
  const res = await api.get("/reservas", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

/** DELETAR RESERVA — enviando corpo no delete */
export async function deletarReserva(reservaId: number) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await api.delete(`/reservas/${reservaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}
