import { prisma } from "../prismaClient";

export const filmeService = {
  getAll: async () => {
    return await prisma.filme.findMany();
  },

  getById: async (id: number) => {
    return await prisma.filme.findUnique({
      where: { id },
    });
  },

  create: async (data: { titulo: string; genero: string; duracao: number }) => {
    return await prisma.filme.create({ data });
  },

  update: async (id: number, data: { titulo?: string; genero?: string; duracao?: number }) => {
    return await prisma.filme.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return await prisma.filme.delete({ where: { id } });
  },
};
