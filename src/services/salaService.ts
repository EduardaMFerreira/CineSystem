import { prisma } from "../prismaClient";

export const getAllSalas = async () => {
  return prisma.sala.findMany();
};

export const getSalaById = async (id: number) => {
  return prisma.sala.findUnique({ where: { id } });
};

export const createSala = async (data: { nome: string; capacidade: number }) => {
  return prisma.sala.create({ data });
};

export const updateSala = async (id: number, data: { nome?: string; capacidade?: number }) => {
  return prisma.sala.update({ where: { id }, data });
};

export const deleteSala = async (id: number) => {
  return prisma.sala.delete({ where: { id } });
};
