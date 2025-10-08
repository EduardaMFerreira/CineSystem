import { prisma } from "../prismaClient"; // Conexão com o banco via Prisma

// Buscar todas as salas
export const getAllSalas = async () => {
  return prisma.sala.findMany();
};

// Buscar sala pelo ID
export const getSalaById = async (id: number) => {
  return prisma.sala.findUnique({ where: { id } });
};

// Criar nova sala
export const createSala = async (data: { nome: string; capacidade: number }) => {
  return prisma.sala.create({ data });
};

// Atualizar sala
export const updateSala = async (id: number, data: { nome?: string; capacidade?: number }) => {
  return prisma.sala.update({ where: { id }, data });
};

// Deletar sala
export const deleteSala = async (id: number) => {
  return prisma.sala.delete({ where: { id } });
};
