import { prisma } from "../prismaClient";

/**
 * Retorna todas as sessões do banco de dados.
 * Inclui também os dados relacionados de filme e sala.
 */
export const getAllSessoes = async () => {
  return prisma.sessao.findMany({
    include: {
      filme: true, // Inclui informações do filme relacionado à sessão
      sala: true,  // Inclui informações da sala relacionada à sessão
    },
  });
};

/**
 * Retorna uma sessão específica pelo ID.
 * @param id - Identificador da sessão
 */
export const getSessaoById = async (id: number) => {
  return prisma.sessao.findUnique({
    where: { id },
    include: {
      filme: true,
      sala: true,
    },
  });
};

/**
 * Cria uma nova sessão no banco de dados.
 * @param data - Objeto contendo `horario`, `filmeId` e `salaId`
 * - Conecta automaticamente a sessão com o filme e a sala existentes
 */
export const createSessao = async (data: { horario: string; filmeId: number; salaId: number }) => {
  return prisma.sessao.create({
    data: {
      horario: new Date(data.horario), // Converte a string em Date
      filme: { connect: { id: data.filmeId } }, // Relaciona a sessão com o filme
      sala: { connect: { id: data.salaId } },   // Relaciona a sessão com a sala
    },
    include: {
      filme: true,
      sala: true,
    },
  });
};

/**
 * Atualiza uma sessão existente.
 * @param id - Identificador da sessão
 * @param data - Campos opcionais para atualização (`horario`, `filmeId`, `salaId`)
 */
export const updateSessao = async (
  id: number,
  data: { horario?: string; filmeId?: number; salaId?: number }
) => {
  return prisma.sessao.update({
    where: { id },
    data: {
      horario: data.horario ? new Date(data.horario) : undefined, // Atualiza horário se fornecido
      filme: data.filmeId ? { connect: { id: data.filmeId } } : undefined, // Atualiza filme se fornecido
      sala: data.salaId ? { connect: { id: data.salaId } } : undefined,     // Atualiza sala se fornecido
    },
    include: {
      filme: true,
      sala: true,
    },
  });
};

/**
 * Exclui uma sessão do banco de dados pelo ID.
 * @param id - Identificador da sessão
 */
export const deleteSessao = async (id: number) => {
  return prisma.sessao.delete({ where: { id } });
};
