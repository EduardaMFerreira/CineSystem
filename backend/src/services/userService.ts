import { prisma } from "../prismaClient";

export const userService = {
  getById: async (id: number) => {
    return prisma.user.findUnique({ where: { id } });
  },

  update: async (id: number, data: { nome?: string; email?: string }) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  updatePassword: async (id: number, senhaHash: string) => {
    return prisma.user.update({
      where: { id },
      data: { senha: senhaHash },
    });
  },
};
