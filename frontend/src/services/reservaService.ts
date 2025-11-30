import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Pega o token do localStorage
function getToken() {
  return localStorage.getItem("token");
}

/**
 * Criar uma nova reserva
 */
export async function criarReserva(sessaoId: number) {
  const token = getToken();
  const res = await api.post(
    "/reservas",
    { sessaoId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.reserva;
}

/**
 * Listar reservas do usuário logado
 */
export async function listarReservas() {
  const token = getToken();
  const res = await api.get("/reservas", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // já retorna array de reservas
}

/**
 * Deletar reserva
 */
export async function deletarReserva(reservaId: number) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  // Envia o ID no corpo da requisição
  const res = await api.delete("/reservas", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id: reservaId }, 
  });

  return res.data;
}
