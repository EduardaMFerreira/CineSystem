import { api } from "./api";

export async function listarFilmes() {
  const res = await api.get("/filmes");
  return res.data;
}

export async function getFilme(id: number) {
  const res = await api.get(`/filmes/${id}`);
  return res.data;
}
