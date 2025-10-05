 import { prisma } from "../prismaClient";

export const getAllSessoes = async () => {
  return prisma.sessao.findMany({
    include: {
      filme: true,
      sala: true,
    },
  });
};

export const getSessaoById = async (id: number) => {
  return prisma.sessao.findUnique({
    where: { id },
    include: {
      filme: true,
      sala: true,
    },
  });
};

export const createSessao = async (data: { horario: string; filmeId: number; salaId: number }) => {
  return prisma.sessao.create({
    data: {
      horario: new Date(data.horario),
      filme: { connect: { id: data.filmeId } },
      sala: { connect: { id: data.salaId } },
    },
    include: {
      filme: true,
      sala: true,
    },
  });
};

export const updateSessao = async (
  id: number,
  data: { horario?: string; filmeId?: number; salaId?: number }
) => {
  return prisma.sessao.update({
    where: { id },
    data: {
      horario: data.horario ? new Date(data.horario) : undefined,
      filme: data.filmeId ? { connect: { id: data.filmeId } } : undefined,
      sala: data.salaId ? { connect: { id: data.salaId } } : undefined,
    },
    include: {
      filme: true,
      sala: true,
    },
  });
};

export const deleteSessao = async (id: number) => {
  return prisma.sessao.delete({ where: { id } });
};
