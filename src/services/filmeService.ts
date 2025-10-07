import { prisma } from "../prismaClient";

/**
 * Serviço responsável pelas operações relacionadas aos filmes.
 * 
 * Contém métodos CRUD (Create, Read, Update, Delete) que interagem com o banco de dados
 * através do Prisma ORM.
 */
export const filmeService = {
   /**
   * Retorna todos os filmes cadastrados no banco de dados.
   * 
   * - Utiliza o método `findMany` do Prisma.
   * - Retorna um array de objetos contendo os dados dos filmes.
   */
  getAll: async () => {
    return await prisma.filme.findMany();
  },

  /**
   * Retorna um filme específico pelo ID.
   * 
   * @param id - Identificador único do filme.
   * - Utiliza `findUnique` para buscar apenas um registro.
   * - Retorna o filme correspondente ou `null` caso não exista.
   */
  getById: async (id: number) => {
    return await prisma.filme.findUnique({
      where: { id },
    });
  },

   /**
   * Cria um novo filme no banco de dados.
   * 
   * @param data - Objeto contendo os dados obrigatórios:
   *   - `titulo`: título do filme.
   *   - `genero`: gênero ou categoria.
   *   - `duracao`: duração total em minutos.
   * 
   * - Utiliza o método `create` do Prisma para inserir o novo registro.
   * - Retorna o filme recém-criado.
   */
  create: async (data: { titulo: string; genero: string; duracao: number }) => {
    return await prisma.filme.create({ data });
  },

  /**
   * Atualiza um filme existente.
   * 
   * @param id - Identificador único do filme.
   * @param data - Objeto com os campos opcionais a serem atualizados:
   *   - `titulo`, `genero`, `duracao`.
   * 
   * - Utiliza o método `update` do Prisma.
   * - Retorna o filme atualizado ou lança erro se o ID não existir.
   */
  update: async (id: number, data: { titulo?: string; genero?: string; duracao?: number }) => {
    return await prisma.filme.update({
      where: { id },
      data,
    });
  },

  /**
   * Exclui um filme do banco de dados.
   * 
   * @param id - Identificador único do filme.
   * - Utiliza o método `delete` do Prisma.
   * - Remove permanentemente o registro do banco.
   */
  delete: async (id: number) => {
    return await prisma.filme.delete({ where: { id } });
  },
};
