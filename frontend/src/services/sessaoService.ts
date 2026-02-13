import { api } from "./api";

export async function listarSessoesPorFilme(filmeId: number) {
  const res = await api.get(`/sessoes?filmeId=${filmeId}`);
  return res.data;
}

export async function getSessao(id: number) {
  const res = await api.get(`/sessoes/${id}`);
  return res.data;
}
