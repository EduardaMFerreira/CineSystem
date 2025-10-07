import { Request, Response } from "express";
import { filmeService } from "../services/filmeService";
import { createFilmeSchema, updateFilmeSchema, filmeResponseSchema } from "../schemas/filmeSchema";
import { z } from "zod";

/**
 * Lista todos os filmes cadastrados.
 *
 * - Busca todos os registros de filmes no banco de dados através do serviço
 * - Valida o formato do array de filmes usando o schema de resposta do Zod
 * - Retorna erro 500 em caso de falha na busca ou validação
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const filmes = await filmeService.getAll();
    const response = z.array(filmeResponseSchema).parse(filmes);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar filmes", error: error.message });
  }
};


/**
 * Retorna um único filme com base no ID informado.
 *
 * - Converte o ID recebido em número
 * - Consulta o filme no banco de dados pelo serviço
 * - Retorna erro 404 se o filme não for encontrado
 * - Valida a estrutura do filme com o schema de resposta antes de enviar
 */
export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const filme = await filmeService.getById(id);
  if (!filme) return res.status(404).json({ message: "Filme não encontrado" });

  res.json(filmeResponseSchema.parse(filme));
};

/**
 * Cria um novo filme.
 *
 * - Valida os dados recebidos no corpo da requisição com o schema de criação
 * - Retorna erro 400 se a validação falhar
 * - Chama o serviço responsável por inserir o novo filme no banco
 * - Retorna o filme criado com status 201 e valida a resposta antes de enviar
 */
export const create = async (req: Request, res: Response) => {
  const parsed = createFilmeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  const novoFilme = await filmeService.create(parsed.data);
  res.status(201).json(filmeResponseSchema.parse(novoFilme));
};


/**
 * Atualiza um filme existente.
 *
 * - Converte o ID para número e valida os dados enviados com o schema de atualização
 * - Retorna erro 400 se os dados forem inválidos
 * - Chama o serviço para atualizar o registro correspondente no banco
 * - Valida o resultado com o schema de resposta antes de retornar
 * - Retorna erro 500 em caso de falha no processo
 */
export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateFilmeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });

  try {
    const filmeAtualizado = await filmeService.update(id, parsed.data);
    res.json(filmeResponseSchema.parse(filmeAtualizado));
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar filme", error: error.message });
  }
};

/**
 * Remove um filme existente.
 *
 * - Recebe o ID como parâmetro
 * - Chama o serviço de exclusão no banco de dados
 * - Retorna 204 (sem conteúdo) quando a exclusão é bem-sucedida
 * - Retorna erro 500 caso ocorra alguma falha durante a exclusão
 */
export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await filmeService.delete(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao deletar filme", error: error.message });
  }
};
